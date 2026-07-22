Feature: Interactive course subscription journey
  The third of the six customer journey mockups — teaser -> email gate ->
  plan selection -> subscribed library. Real email regex validation gates
  progress, which is exactly the kind of edge case worth testing directly
  rather than assuming a gate "just works".

  Background:
    Given I open the component library page
    And I switch to the course subscription demo iframe

  Scenario: The journey opens on the teaser view
    Then the teaser view should be active

  Scenario: An invalid email does not pass the gate
    When I go to the email gate
    And I submit the email "not-an-email"
    Then the gate view should still be active
    And an error toast should be shown

  Scenario: An email with no domain does not pass the gate
    When I go to the email gate
    And I submit the email "someone@"
    Then a toast should be shown

  Scenario: An email with no @ does not pass the gate
    When I go to the email gate
    And I submit the email "someone.example.com"
    Then a toast should be shown

  Scenario: A valid email passes the gate to plan selection
    When I go to the email gate
    And I submit the email "amara@example.com"
    Then the plans view should be active

  Scenario: Selecting the annual plan marks it selected and not monthly
    Given I go to the email gate
    And I submit the email "amara@example.com"
    When I select the "annual" plan
    Then the "annual" plan should be marked selected
    And the "monthly" plan should not be marked selected

  Scenario: Confirming a subscription reveals the course library
    Given I go to the email gate
    And I submit the email "amara@example.com"
    And I select the "monthly" plan
    When I confirm the subscription
    Then the library view should be active
    And at least one course card should be visible

  Scenario: Confirming a subscription shows a success toast
    Given I go to the email gate
    And I submit the email "amara@example.com"
    When I confirm the subscription
    Then a toast should be shown
