#!/usr/bin/env python3
"""
Git Auto Session Reviewer

Analyzes the git session log and generates a review report with
workflow scores, pattern analysis, and improvement suggestions.

Usage:
    python review_sessions.py <project_dir> [--since YYYY-MM-DD]

Output:
    Writes review to .claude/git-auto-review.md
    Prints summary to stdout
"""

import json
import sys
import os
from datetime import datetime, timezone
from collections import Counter


def load_log(project_dir):
    log_path = os.path.join(project_dir, ".claude", "git-auto-log.json")
    if not os.path.exists(log_path):
        return {"sessions": []}
    with open(log_path, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {"sessions": []}


def load_improvements(project_dir):
    path = os.path.join(project_dir, ".claude", "git-auto-improvements.json")
    if not os.path.exists(path):
        return {"suggestions": [], "applied": []}
    with open(path, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {"suggestions": [], "applied": []}


def filter_sessions(sessions, since=None):
    if not since:
        return sessions
    return [s for s in sessions if s.get("timestamp", "") >= since]


def analyze_patterns(sessions):
    """Analyze git workflow patterns from session data."""
    patterns = {
        "workflow_types": Counter(),
        "files_frequency": Counter(),
        "file_pairs": Counter(),
        "branches": [],
        "avg_ops_per_session": 0,
        "issue_types": Counter(),
        "issue_details": [],
        "preventable_count": 0,
    }

    total_ops = 0
    for s in sessions:
        # Workflow types
        patterns["workflow_types"][s.get("workflow_type", "unknown")] += 1

        # Files
        files = s.get("files_touched", [])
        for f in files:
            patterns["files_frequency"][f] += 1

        # File pairs (files committed together)
        sorted_files = sorted(files)
        for i in range(len(sorted_files)):
            for j in range(i + 1, len(sorted_files)):
                pair = f"{sorted_files[i]} + {sorted_files[j]}"
                patterns["file_pairs"][pair] += 1

        # Branches
        branch = s.get("branch")
        if branch:
            patterns["branches"].append(branch)

        # Operations count
        total_ops += len(s.get("operations", []))

        # Issues
        for issue in s.get("issues_encountered", []):
            patterns["issue_types"][issue.get("type", "unknown")] += 1
            patterns["issue_details"].append(issue)
            if issue.get("preventable", False):
                patterns["preventable_count"] += 1

    if sessions:
        patterns["avg_ops_per_session"] = round(total_ops / len(sessions), 1)

    return patterns


def score_workflow(sessions, patterns):
    """Score the workflow on 5 dimensions (1-5 scale)."""
    scores = {}

    # Commit hygiene: small commits, good messages
    if not sessions:
        return {k: 3 for k in ["commit_hygiene", "branch_discipline",
                                "safety", "efficiency", "collaboration"]}

    avg_files = sum(len(s.get("files_touched", [])) for s in sessions) / max(len(sessions), 1)
    scores["commit_hygiene"] = 5 if avg_files <= 3 else 4 if avg_files <= 6 else 3 if avg_files <= 10 else 2

    # Branch discipline
    unique_branches = len(set(patterns["branches"]))
    has_feature_branches = any("/" in b for b in patterns["branches"])
    scores["branch_discipline"] = 4 if has_feature_branches else 3

    # Safety
    has_force_push = any(
        "force" in op.get("command", "").lower()
        for s in sessions
        for op in s.get("operations", [])
    )
    scores["safety"] = 3 if has_force_push else 5

    # Efficiency
    success_rate = sum(1 for s in sessions if s.get("outcome") == "success") / max(len(sessions), 1)
    scores["efficiency"] = round(success_rate * 5)

    # Collaboration
    has_prs = any(s.get("workflow_type") == "pr-create" for s in sessions)
    scores["collaboration"] = 4 if has_prs else 3

    return scores


def generate_report(project_dir, sessions, patterns, scores):
    """Generate the markdown review report."""
    total = len(sessions)
    successes = sum(1 for s in sessions if s.get("outcome") == "success")
    success_rate = round(successes / max(total, 1) * 100, 1)

    most_common_wf = patterns["workflow_types"].most_common(1)
    most_common_str = f"{most_common_wf[0][0]} ({most_common_wf[0][1]} times)" if most_common_wf else "N/A"

    total_issues = sum(patterns["issue_types"].values())

    # Date range
    first = sessions[0].get("timestamp", "unknown")[:10] if sessions else "N/A"
    last = sessions[-1].get("timestamp", "unknown")[:10] if sessions else "N/A"

    report = f"""# Git Workflow Review — {first} to {last}

## Summary

Analyzed {total} git sessions. Success rate is {success_rate}% with {total_issues} issues
encountered ({patterns['preventable_count']} preventable). Most common workflow: {most_common_str}.

## Stats

| Metric | Value |
|--------|-------|
| Total sessions | {total} |
| Success rate | {success_rate}% |
| Most common workflow | {most_common_str} |
| Avg operations/session | {patterns['avg_ops_per_session']} |
| Total issues | {total_issues} |
| Preventable issues | {patterns['preventable_count']} |

## Workflow Scores

| Dimension | Score | Notes |
|-----------|-------|-------|
| Commit hygiene | {scores['commit_hygiene']}/5 | Small, focused, well-named commits |
| Branch discipline | {scores['branch_discipline']}/5 | Naming, lifecycle, merge cleanliness |
| Safety | {scores['safety']}/5 | No force pushes, no secrets |
| Efficiency | {scores['efficiency']}/5 | Minimal wasted steps |
| Collaboration | {scores['collaboration']}/5 | PR quality, issue linking |

## Patterns Observed

"""

    # File frequency
    top_files = patterns["files_frequency"].most_common(5)
    if top_files:
        report += "**Most frequently committed files:**\n\n"
        for f, count in top_files:
            report += f"- `{f}` ({count} times)\n"
        report += "\n"

    # File pairs
    top_pairs = patterns["file_pairs"].most_common(3)
    if top_pairs:
        report += "**Files often committed together:**\n\n"
        for pair, count in top_pairs:
            report += f"- {pair} ({count} times)\n"
        report += "\n"

    # Issues
    if patterns["issue_types"]:
        report += "## Top Issues\n\n"
        for issue_type, count in patterns["issue_types"].most_common(5):
            report += f"- **{issue_type}**: {count} occurrences\n"
        report += "\n"

    # Recommendations placeholder
    report += """## Recommendations

_Recommendations are generated by reviewing patterns in the log data. See
`.claude/git-auto-improvements.json` for specific skill improvement suggestions._

"""

    return report


def main():
    if len(sys.argv) < 2:
        print("Usage: python review_sessions.py <project_dir> [--since YYYY-MM-DD]")
        sys.exit(1)

    project_dir = sys.argv[1]
    since = None
    if "--since" in sys.argv:
        idx = sys.argv.index("--since")
        if idx + 1 < len(sys.argv):
            since = sys.argv[idx + 1]

    log_data = load_log(project_dir)
    sessions = filter_sessions(log_data["sessions"], since)

    if not sessions:
        print("No sessions found to review.")
        sys.exit(0)

    patterns = analyze_patterns(sessions)
    scores = score_workflow(sessions, patterns)
    report = generate_report(project_dir, sessions, patterns, scores)

    # Write report
    review_path = os.path.join(project_dir, ".claude", "git-auto-review.md")
    os.makedirs(os.path.dirname(review_path), exist_ok=True)
    with open(review_path, "w") as f:
        f.write(report)

    print(f"Review written to {review_path}")
    print(f"\nQuick stats: {len(sessions)} sessions, "
          f"{sum(1 for s in sessions if s.get('outcome') == 'success')}/{len(sessions)} successful, "
          f"{sum(patterns['issue_types'].values())} issues")
    print(f"\nScores: " + " | ".join(f"{k}: {v}/5" for k, v in scores.items()))


if __name__ == "__main__":
    main()
