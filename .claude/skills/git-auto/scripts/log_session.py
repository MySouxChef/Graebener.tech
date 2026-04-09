#!/usr/bin/env python3
"""
Git Auto Session Logger

Appends a git session entry to .claude/git-auto-log.json.
Used by the git-auto skill to track every git workflow for review and self-improvement.

Usage:
    python log_session.py <project_dir> <session_json>

    session_json is a JSON string with the session data to append.

Example:
    python log_session.py /path/to/project '{"operations": [...]}'
"""

import json
import sys
import os
from datetime import datetime, timezone


def get_log_path(project_dir):
    """Get the path to the git auto log file."""
    log_dir = os.path.join(project_dir, ".claude")
    os.makedirs(log_dir, exist_ok=True)
    return os.path.join(log_dir, "git-auto-log.json")


def load_log(log_path):
    """Load existing log or create empty structure."""
    if os.path.exists(log_path):
        with open(log_path, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return {"sessions": []}
    return {"sessions": []}


def generate_session_id(log_data):
    """Generate a unique session ID based on date and count."""
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    today_count = sum(
        1 for s in log_data["sessions"]
        if s.get("id", "").startswith(f"session-{today}")
    )
    return f"session-{today}-{today_count + 1:03d}"


def append_session(project_dir, session_data):
    """Append a session entry to the log."""
    log_path = get_log_path(project_dir)
    log_data = load_log(log_path)

    # Add metadata
    session_data["id"] = generate_session_id(log_data)
    session_data["timestamp"] = datetime.now(timezone.utc).isoformat()
    session_data["project"] = os.path.basename(os.path.abspath(project_dir))

    log_data["sessions"].append(session_data)

    with open(log_path, "w") as f:
        json.dump(log_data, f, indent=2)

    print(f"Logged session {session_data['id']} to {log_path}")
    return session_data["id"]


def get_stats(project_dir):
    """Get summary stats from the log."""
    log_path = get_log_path(project_dir)
    log_data = load_log(log_path)

    sessions = log_data["sessions"]
    if not sessions:
        return {"total_sessions": 0, "message": "No sessions logged yet."}

    total = len(sessions)
    successes = sum(1 for s in sessions if s.get("outcome") == "success")

    workflow_types = {}
    for s in sessions:
        wt = s.get("workflow_type", "unknown")
        workflow_types[wt] = workflow_types.get(wt, 0) + 1

    all_issues = []
    for s in sessions:
        all_issues.extend(s.get("issues_encountered", []))

    preventable = sum(1 for i in all_issues if i.get("preventable", False))

    issue_types = {}
    for i in all_issues:
        it = i.get("type", "unknown")
        issue_types[it] = issue_types.get(it, 0) + 1

    return {
        "total_sessions": total,
        "success_rate": round(successes / total * 100, 1),
        "workflow_types": workflow_types,
        "total_issues": len(all_issues),
        "preventable_issues": preventable,
        "issue_types": issue_types,
        "first_session": sessions[0].get("timestamp"),
        "last_session": sessions[-1].get("timestamp"),
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python log_session.py <project_dir> [session_json | --stats]")
        sys.exit(1)

    project_dir = sys.argv[1]

    if len(sys.argv) == 2 or sys.argv[2] == "--stats":
        stats = get_stats(project_dir)
        print(json.dumps(stats, indent=2))
    else:
        session_json = sys.argv[2]
        session_data = json.loads(session_json)
        session_id = append_session(project_dir, session_data)
        print(f"Session {session_id} logged successfully.")
