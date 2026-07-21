Feature: Keyboard accessibility
  Regression coverage for the specific WCAG failures found in the original
  audit (zero ARIA attributes, unfocusable nav links, contrast failures) —
  these scenarios exist so those exact bugs can never silently come back.

  Background:
    Given I open the component library page

  Scenario: The mobile menu toggle is a real labeled button
    Then the mobile menu toggle should be a "button" element
    And it should have a non-empty "aria-label"

  Scenario: Opening the mobile nav updates aria-expanded on its toggle
    When I click the mobile menu toggle
    Then the mobile menu toggle should have aria-expanded "true"

  Scenario: The mobile sidebar overlay is hidden from assistive technology
    Then the sidebar overlay should have "aria-hidden" set to "true"

  Scenario: Escape closes the mobile nav drawer
    Given I click the mobile menu toggle
    When I press "Escape"
    Then the mobile nav drawer should be closed

  Scenario: The day/night switch has a descriptive, state-aware label
    Then the site mode switch should have aria-label "Switch to day mode"
    When I click the site day/night switch
    Then the site mode switch should have aria-label "Switch to night mode"

  Scenario: Text-faint contrast meets WCAG AA in every theme
    Then the contrast ratio of muted text should be at least 4.5 to 1 in theme "wine"
    And the contrast ratio of muted text should be at least 4.5 to 1 in theme "scrolly"
    And the contrast ratio of muted text should be at least 4.5 to 1 in theme "day"

  Scenario: Tabbing through the page reaches the search box, theme buttons, and nav links in order
    When I press "Tab" repeatedly until the search input is focused
    Then continuing to press "Tab" should reach a theme toggle button next

  Scenario: No interactive element is missing an accessible name
    Then every "button" element on the page should have an accessible name

  Scenario: Focus is visible on every interactive element
    When I focus the first "button" element on the page
    Then it should have a visible focus outline
