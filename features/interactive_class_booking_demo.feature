Feature: Interactive class booking demo
  The embedded class-booking mockup's expandable rows must toggle correctly,
  including when multiple rows are opened and closed in sequence.

  Background:
    Given I open the component library page
    And I switch to the class booking demo iframe

  Scenario: Class rows start collapsed
    Then no class detail panel should be open

  Scenario: Clicking a class row expands its detail panel
    When I click the first class row
    Then its detail panel should be open
    And aria-expanded on that row should be "true"

  Scenario: Clicking an open class row collapses it again
    Given I click the first class row
    When I click the first class row again
    Then its detail panel should be closed
    And aria-expanded on that row should be "false"

  Scenario: Opening a second row does not require closing the first
    Given I click the first class row
    When I click the second class row
    Then both detail panels should be open

  Scenario: Class rows are keyboard-operable via Enter and Space
    When I focus the first class row
    And I press "Enter"
    Then its detail panel should be open
    When I press "Space"
    Then its detail panel should be closed

  Scenario: Booking a class updates its state without a page reload
    Given I click the first class row
    When I click "Book" on that class
    Then that class should be marked as booked
    And the page URL should not have changed
