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
