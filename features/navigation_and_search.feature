Feature: Navigation, category filters, and search
  The sidebar nav, category chips, and search widget must combine by AND logic
  (a section must pass both the active category and the search term to stay
  visible) rather than fighting each other, per ADR-007.

  Background:
    Given I open the component library page

  Scenario: Clicking a nav link scrolls to its section
    When I click the "Buttons" nav link
    Then the "sec-buttons" section should be in view

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

  Scenario: Search alone filters sections by matching text
    When I search for "tonal scale"
    Then the "Wine tonal scale" nav link should be visible
    And the "Buttons" nav link should not be visible

  Scenario: Search and category combine with AND logic, not override
    Given I click the "Commerce" category chip
    When I search for "gallery"
    Then the "Gallery grid" nav link should not be visible

  Scenario: Clearing the search term while a category is active restores that category's items
    Given I click the "Commerce" category chip
    When I search for "nonexistent-term-xyz"
    And I clear the search field
    Then the "Cart drawer" nav link should be visible

  Scenario: Search with no matches shows no nav links, not an error
    When I search for "zzz-no-such-thing-zzz"
    Then no nav links should be visible
    And the page should not show a JavaScript error

  Scenario: Keyboard shortcut Ctrl+F focuses the search box
    When I press "Control+f"
    Then the search input should be focused

  Scenario: Search is case-insensitive
    When I search for "BUTTONS"
    Then the "Buttons" nav link should be visible
