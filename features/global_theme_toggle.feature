Feature: Global site-wide theme toggle
  The theme system applied at the Docusaurus root — four component themes
  plus the independent day/night site-chrome switch, both driving real
  Infima/Docusaurus chrome (navbar, sidebar, page background), not just
  content inside an embedded iframe. This is a different mechanism from
  the in-iframe toggle inside component-library.html, tested separately.

  Background:
    Given I open the docs page "foundations"
    And I wait for the global theme toggle to be ready

  Scenario: Wine/Gold is the default global theme
    Then the html element should have data-afj-theme "wine"

  Scenario Outline: Clicking each global theme button updates the whole page
    When I click the global "<theme>" theme button
    Then the html element should have data-afj-theme "<theme>"
    And the navbar background color should change from the Wine/Gold default

    Examples:
      | theme      |
      | scrolly    |
      | day        |
      | scrollyday |

  Scenario: The global theme choice persists across a reload
    When I click the global "scrolly" theme button
    And I reload the page
    And I wait for the global theme toggle to be ready
    Then the html element should have data-afj-theme "scrolly"

  Scenario: The global theme choice persists across navigation to a different page
    When I click the global "day" theme button
    And I open the docs page "core-ui"
    And I wait for the global theme toggle to be ready
    Then the html element should have data-afj-theme "day"

  Scenario: The site day/night switch is independent of the four themes
    Given the html element should have data-afj-theme "wine"
    When I click the global site day/night switch
    Then the html element should have data-afj-mode "day"
    And the html element should still have data-afj-theme "wine"

  Scenario: Toggling site day/night twice returns to the original mode
    When I click the global site day/night switch
    And I click the global site day/night switch
    Then the html element should have data-afj-mode "dark"

  Scenario: The site day/night switch has a state-aware accessible label
    Then the global site day/night switch should have aria-label "Switch to day mode"
    When I click the global site day/night switch
    Then the global site day/night switch should have aria-label "Switch to night mode"

  Scenario: Only one global theme button is marked pressed at a time
    When I click the global "scrollyday" theme button
    Then exactly 1 global theme button should be marked aria-pressed true

  Scenario: Docusaurus's own built-in dark/light switch is not present
    Then there should be no visible Docusaurus color-mode toggle button

  Scenario: The global theme choice is written to localStorage under its own key
    When I click the global "scrolly" theme button
    Then localStorage key "afj-site-theme-state" should contain "scrolly"
