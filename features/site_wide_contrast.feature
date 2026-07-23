Feature: Site-wide text contrast
  Regression coverage for the two real bugs a live-site audit found:
  Bootstrap's un-themed body color, and the theme/mode chrome coupling
  gap. These exist so neither can silently come back.

  Background:
    Given I open the docs page "core-ui"
    And I wait for the global theme toggle to be ready

  Scenario Outline: Body text meets WCAG AA in every theme
    When I click the global "<theme>" theme button
    Then the computed body text contrast ratio should be at least 4.5 to 1

    Examples:
      | theme      |
      | wine       |
      | scrolly    |
      | day        |
      | scrollyday |

  Scenario Outline: Picking a theme via the navbar also sets sensible chrome mode
    When I click the global "<theme>" theme button
    Then the html element should have data-afj-mode "<expectedMode>"

    Examples:
      | theme      | expectedMode |
      | wine       | dark         |
      | scrolly    | dark         |
      | day        | day          |
      | scrollyday | day          |

  Scenario: Sidebar nav links meet WCAG AA against the Day theme background
    When I click the global "day" theme button
    Then the computed sidebar link contrast ratio should be at least 4.5 to 1
