# Eval Schemas & Benchmarking Guide

Standardized schemas and evaluation workflows for testing skill triggering and output fidelity.

---

## 1. Test Case Schema (`evals/evals.json`)

```json
{
  "skill_name": "example-skill",
  "version": "1.0.0",
  "evals": [
    {
      "id": "eval-01",
      "name": "valid_cad_extraction",
      "prompt": "Extract all steel beam cut lengths from attached DXF drawing and format as production CSV.",
      "files": ["fixtures/beam_sample.dxf"],
      "expected_output": "CSV file with columns [Part_ID, Profile, Length_MM, Quantity, Material_Grade]",
      "assertions": [
        {
          "name": "has_valid_csv_header",
          "type": "exact_match",
          "target": "Part_ID,Profile,Length_MM,Quantity,Material_Grade"
        },
        {
          "name": "contains_all_12_parts",
          "type": "row_count",
          "expected_count": 12
        }
      ]
    }
  ]
}
```

---

## 2. Triggering Accuracy Benchmark Schema

```json
{
  "eval_queries": [
    {
      "query": "Can you generate an executive summary and architectural spec for the new ERP database migration?",
      "should_trigger": true,
      "expected_skill": "doc-coauthoring"
    },
    {
      "query": "Fix typo in variable name in server.ts line 42",
      "should_trigger": false,
      "expected_skill": null
    }
  ]
}
```

---

## 3. Grading & Evaluation Loop

1. **Automated Assertion Testing**: Run programmatic checkers (lint, regex, JSON validation) to verify deterministic requirements.
2. **Qualitative Review**: Evaluate tone, visual craftsmanship, and logical coherence.
3. **Variance Analysis**: Compare token efficiency, tool call count, and wall-clock execution time between baseline and skilled execution.
