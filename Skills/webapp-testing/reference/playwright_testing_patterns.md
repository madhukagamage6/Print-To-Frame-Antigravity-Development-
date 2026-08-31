# Playwright WebApp Testing Patterns & Assertions

Best practices, robust selector strategies, and end-to-end testing patterns for modern React/SPA applications.

---

## 1. Robust Selector Strategy

Prioritize resilient selectors that reflect user interactions rather than fragile DOM structures:

1. **Role & Text (Highest Priority)**:
   - `page.get_by_role('button', name='Create Order')`
   - `page.get_by_role('heading', name='Production Dashboard')`
2. **Accessible Labels & Placeholders**:
   - `page.get_by_label('Profile Length (mm)')`
   - `page.get_by_placeholder('Search orders...')`
3. **Test IDs & Unique IDs**:
   - `page.get_by_test_id('cad-viewer-canvas')`
   - `page.locator('#order-status-badge')`
4. **Avoid**:
   - Fragile nested CSS paths like `div > div:nth-child(3) > span > button`
   - Auto-generated CSS class hashes

---

## 2. Waiting & Synchronization Best Practices

Avoid arbitrary `time.sleep()`. Modern SPAs re-render asynchronously; use Playwright's built-in auto-waiting and state assertions:

```python
# 1. Wait for network idle after navigation
page.goto('http://localhost:3000')
page.wait_for_load_state('networkidle')

# 2. Wait for specific element visibility before interaction
btn = page.get_by_role('button', name='Save Calculation')
btn.wait_for(state='visible', timeout=5000)
btn.click()

# 3. Wait for asynchronous API responses / state updates
page.wait_for_selector('text=Saved Successfully', timeout=5000)
```

---

## 3. End-to-End Test Suite Template

```python
from playwright.sync_api import sync_playwright, expect
import os

def test_erp_workflow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        # Step 1: Open Application
        page.goto('http://localhost:3000')
        page.wait_for_load_state('networkidle')

        # Step 2: Navigate to Module
        page.click('text=Operations')
        
        # Step 3: Assert Header & Table Render
        expect(page.get_by_role('heading', name='Operations')).to_be_visible()
        
        # Step 4: Capture Artifact Screenshot
        os.makedirs('/tmp/test_reports', exist_ok=True)
        page.screenshot(path='/tmp/test_reports/operations_view.png', full_page=True)

        browser.close()
        print("Test completed successfully!")

if __name__ == '__main__':
    test_erp_workflow()
```

---

## 4. Visual Verification & Error Diagnostic Protocol

When tests fail or UI discrepancies occur:
1. **Full-page Screenshot**: `page.screenshot(path='/tmp/error_state.png', full_page=True)`
2. **Console Error Capture**: Attach `page.on('console', ...)` and `page.on('pageerror', ...)` to trap runtime JS crashes.
3. **HTML Snapshot**: `with open('/tmp/page_dump.html', 'w') as f: f.write(page.content())` to verify rendered elements.
