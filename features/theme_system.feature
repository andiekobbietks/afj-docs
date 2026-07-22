Feature: Component library theme system
  The AFJ Cardiff component library ships four themes (Wine/Gold, Scrollytelling,
  Day mode, Scrolly Day) plus an independent site day/night chrome toggle. Every
  preview must update live when a theme is switched.

  Background:
    Given I open the component library page

  Scenario: Wine/Gold is the default theme on load
    Then the active theme should be "wine"

  Scenario Outline: Switching to each theme updates the active theme
    When I click the "<theme>" theme button
    Then the active theme should be "<theme>"

    Examples:
      | theme      |
      | scrolly    |
      | day        |
      | scrollyday |
      | wine       |

  Scenario: Switching theme keeps the page scroll position
    When I scroll to the "sec-winescale" section
    And I click the "scrolly" theme button
    Then the page scroll position should not have changed

  Scenario: Site day/night toggle is independent of the four component themes
    Given the active theme is "wine"
    When I click the site day/night switch
    Then the site chrome should be in "day" mode
    And the active theme should still be "wine"

  Scenario: Toggling site day/night twice returns to the original mode
    Given the site chrome is in "dark" mode
    When I click the site day/night switch
    And I click the site day/night switch
    Then the site chrome should be in "dark" mode

  Scenario: Rapidly switching between all four themes leaves no stale state
    When I click the "scrolly" theme button
    And I click the "day" theme button
    And I click the "scrollyday" theme button
    And I click the "wine" theme button
    Then the active theme should be "wine"
    And only one theme button should be marked active
