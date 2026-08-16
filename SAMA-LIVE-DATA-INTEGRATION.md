# SAMA live data and controlled parameter integration

## Intended data flow

```text
Machines / PLCs
      ↓
OPC / Kepware / MES collection
      ↓
MySQL operational database
      ↓
SAMA read API (HTTPS 443)
      ↓
SAMA Operations & Process Control
```

The browser must never connect to MySQL on port 3306 or directly to a PLC. It reads authorised JSON from the SAMA API over HTTPS.

## Required read endpoints

| Endpoint | Used for |
| --- | --- |
| `GET /api/v1/operations/summary` | Running, maintenance, takt, production and rejection KPIs |
| `GET /api/v1/machines/live` | Machine status, cycle time, processed quantity, rejection and PM condition |
| `GET /api/v1/process-parameters/live` | Actual value, approved setpoint, limits, units and source timestamp |
| `GET /api/v1/parameter-change-requests` | Request, review, approval and execution history |
| `GET /api/v1/shifts/previous/summary` | Previous-shift output, quality, downtime and line performance |
| `GET /api/v1/shift-handover/current` | Carry-forward notes, acknowledgements, owners and status |
| `GET /api/v1/problems/active` | Cross-functional problem board and production impact |
| `GET /api/v1/quality/defects/previous-shift` | Defect contribution, containment and ownership |
| `GET /api/v1/breakdowns/previous-shift` | Breakdown symptom, root cause, action and restoration status |
| `GET /api/v1/troubleshooting/playbooks` | Approved department-specific safe troubleshooting steps |

The response from these endpoints should populate `js/operationalData.js` through a secured data service. Operations Control, Analytics and the login-aware AI must consume this one adapter so production counts cannot disagree between screens.

## AI context sent by the secured backend

The production AI service should build its context on the server from:

- Verified Employee ID, department, role and permissions
- Current shift and selected production line
- Production actual, plan, gap and hourly trend
- Yield, rejection, grade and defect metrics allowed for the user
- Machine status, cycle time, downtime, MTTR, MTBF and PM status
- Process parameters and limits only when the role has parameter-view permission
- Parameter-change history only when audit permission is present
- Shift-handover notes and active-problem ownership allowed for the login department
- Previous-shift defect containment only for Quality-authorised profiles
- Breakdown root cause/restoration steps only for Maintenance-authorised profiles
- Safe operator checks only for Production profiles; no bypass or guarded-area instruction

Do not send the department or permissions from an editable browser form. Resolve them from the authenticated server session on every AI request.

## Minimum live-machine fields

```json
{
  "machineId": "LAM-01",
  "machineName": "Laminator-01",
  "line": "Line-1",
  "process": "Lamination",
  "status": "Running",
  "cycleTimeSeconds": 930,
  "cycleTargetSeconds": 930,
  "processedQuantity": 2880,
  "rejectionRate": 0.31,
  "maintenanceState": "Healthy",
  "nextPmAt": "2026-08-18T06:00:00+05:30",
  "sourceTimestamp": "2026-08-16T14:20:05+05:30"
}
```

## Controlled parameter-change flow

1. Quality or Process Engineering creates a request containing old value, proposed value, reason and supporting evidence.
2. The API validates the user department, machine tag allowlist, approved engineering range and request completeness.
3. A different authorised Process Engineering / Operations Excellence user approves or rejects it. Self-approval is blocked.
4. An authorised machine-write service performs the approved change through the existing industrial control layer.
5. The service reads the PLC value back and records requested, approved, written and verified values with timestamps.
6. SAMA shows the full audit history. A failed readback automatically marks the execution unsuccessful and raises an alert.

## Required server-side controls

- Employee authentication and department mapping on the server
- API permission checks on every request; never trust the role sent by JavaScript
- Separate `view`, `request`, `approve` and `execute` permissions
- No self-approval
- Allowlisted PLC tags only
- Hard engineering min/max values held on the server
- Mandatory reason and change ticket
- Rate limiting, session expiry and activity logging
- Immutable audit record with employee ID and timestamps
- Readback verification and automatic rollback or safe-stop procedure defined by Engineering

GitHub Pages is suitable for this visual prototype only. Real operational or parameter-write capability must be hosted behind the Solex secure gateway or an approved organisation backend.
