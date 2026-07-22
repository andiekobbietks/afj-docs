Feature: Navigation, category filters, and search
  The sidebar nav, category chips, and search widget must combine by AND logic
  (a section must pass both the active category and the search term to stay
  visible) rather than fighting each other, per ADR-007.

  Background:
    Given I open the component library page

  Scenario: Clicking a nav link marks it active and updates the breadcrumb
    When I click the "Buttons" nav link
    Then the "Buttons" nav link should have the active class
    And the breadcrumb should show "Buttons"

  Scenario: Nav links are real keyboard-focusable anchors
    Then every sidebar nav link should have a real "href" attribute

  Scenario: Category chips are real buttons with correct pressed state
    When I click the "Commerce" category chip
    Then the "Commerce" category chip should be marked pressed
    And the "Foundations" category chip should not be marked pressed

  Scenario: Selecting "All" clears any category filter
    Given I click the "Core UI" category chip
    When I click the "All" category chip
    Then every nav group should be visible

  Scenario: Search alone filters the main content sections by matching text
    When I search for "tonal scale"
    Then the "sec-winescale" content section should be visible
    And the "sec-buttons" content section should not be visible

  Scenario: Search and category combine with AND logic, not override
    Given I click the "Commerce" category chip
    When I search for "gallery"
    Then the "sec-gallery" content section should not be visible

  Scenario: Clearing the search term while a category is active restores that category's items
    Given I click the "Commerce" category chip
    When I search for "nonexistent-term-xyz"
    And I clear the search field
    Then the "sec-drawer" content section should be visible

  Scenario: Search with no matches shows the empty-state pane, not an error
    When I search for "zzz-no-such-thing-zzz"
    Then the search-empty pane should be visible
    And the page should not show a JavaScript error

  Scenario: Keyboard shortcut Ctrl+F focuses the search box
    When I press "Control+f"
    Then the search input should be focused

  Scenario: Search is case-insensitive
    When I search for "BUTTONS"
    Then the "sec-buttons" content section should be visible
