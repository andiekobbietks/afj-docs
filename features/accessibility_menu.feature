Feature: Accessibility menu
  Six controls — text size, high contrast, hyperlegible font, reduce motion,
  underline links, large cursor — persisted to localStorage under the same
  key used by the Docusaurus shell's AccessibilityMenu component, so a
  setting changed on either surface applies to both.

  Background:
    Given I open the component library page

  Scenario: The menu is closed by default
    Then the accessibility panel should not be open

  Scenario: Opening and closing the menu toggles aria-expanded
    When I click the accessibility menu trigger
    Then the accessibility panel should be open
    And the accessibility trigger should have aria-expanded "true"
    When I click the accessibility menu trigger
    Then the accessibility panel should not be open
    And the accessibility trigger should have aria-expanded "false"

  Scenario: Text size defaults to 100%
    When I open the accessibility menu
    Then the text size should read "100"

  Scenario Outline: Text size can be set across its full range
    When I open the accessibility menu
    And I set text size to "<value>"
    Then the text size should read "<value>"
    And the root font size should be "<value>%"

    Examples:
      | value |
      | 75    |
      | 100   |
      | 125   |
      | 150   |

  Scenario: Text size cannot go below the minimum
    When I open the accessibility menu
    And I set text size to "50"
    Then the text size should read "75"

  Scenario: Text size cannot go above the maximum
    When I open the accessibility menu
    And I set text size to "200"
    Then the text size should read "150"

  Scenario: High contrast toggles on and persists across a reload
    When I open the accessibility menu
    And I enable high contrast
    Then high contrast should be enabled
    When I reload the page
    Then high contrast should be enabled

  Scenario: Hyperlegible font toggle swaps the body font
    When I open the accessibility menu
    And I enable the hyperlegible font
    Then the body font family should include "Atkinson Hyperlegible Next"

  Scenario: Reduce motion sets the reduced-motion attribute
    When I open the accessibility menu
    And I enable reduce motion
    Then the html element should have data-a11y-motion "reduce"

  Scenario: Underline links applies text-decoration to links
    When I open the accessibility menu
    And I enable underline links
    Then site links should be underlined

  Scenario: Large cursor sets a custom cursor
    When I open the accessibility menu
    And I enable large cursor
    Then the html element should have data-a11y-cursor "large"

  Scenario: Reset restores every control to its default in one action
    Given I open the accessibility menu
    And I set text size to "150"
    And I enable high contrast
    And I enable the hyperlegible font
    And I enable reduce motion
    And I enable underline links
    And I enable large cursor
    When I click reset accessibility settings
    Then the text size should read "100"
    And high contrast should be disabled
    And the hyperlegible font should be disabled
    And the html element should have data-a11y-motion "normal"
    And site links should not be underlined
    And the html element should have data-a11y-cursor "normal"

  Scenario: Settings persist to localStorage under the shared key
    When I open the accessibility menu
    And I enable high contrast
    Then localStorage key "afj-accessibility-settings" should contain "highContrast"
