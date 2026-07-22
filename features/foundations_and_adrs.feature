Feature: Foundations content and ADR consistency
  Design tokens, typography, and every Architecture Decision Record on the
  site checked for structural consistency — every ADR should follow the
  same context/options/decision/reasoning shape, not just look similar.

  Background:
    Given I open the component library page

  Scenario: Design tokens section shows real swatches for all four themes
    When I scroll to the "sec-tokens" section
    Then that section should contain at least 5 token swatches

  Scenario: Typography section demonstrates the gradient headline treatment
    When I scroll to the "sec-typography" section
    Then that section should contain an element with the gradient heading class

  Scenario: Every ADR on the site has a title, a status, and all four fields
    Then there should be at least 9 ADR cards on the page
    And every ADR card should have a non-empty title
    And every ADR card should have a status badge
    And every ADR card should have exactly 4 fields

  Scenario: Every ADR field has both a label and body text
    Then every ADR field on the page should have both a label and non-empty text

  Scenario: No ADR status is left as a placeholder
    Then no ADR card should have an empty or placeholder status
