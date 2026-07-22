Feature: Brand source imagery and assembly/compare content
  Real logo imagery needs real alt text (accessibility, and these are
  reference crops meant to be read, not decorative). Assembly and
  Compare & Contrast document how the primitives combine and how the two
  design systems divide responsibility, in actual Gherkin.

  Background:
    Given I open the component library page

  Scenario: Every brand imagery image has non-empty, descriptive alt text
    When I scroll to the "sec-brandimagery" section
    Then every image in that section should have alt text longer than 10 characters

  Scenario: Typeface families names both a free and commercial font match
    When I scroll to the "sec-fontfamilies" section
    Then the text in that section should mention "Free:"
    And the text in that section should mention "Commercial:"

  Scenario: The Assembly section shows primitives combining into a real flow
    When I scroll to the "sec-assembly" section
    Then that section should contain at least 4 assembly chips

  Scenario: Compare and Contrast documents both themes in real Gherkin
    When I scroll to the "sec-compare" section
    Then that section should contain at least 2 Gherkin feature blocks
    And the Gherkin blocks should mention "Wine"
    And the Gherkin blocks should mention "Scrollytelling"
