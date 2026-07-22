Feature: Orientation content
  Start Here, About This Site, and the Glossary — the reference content a
  new reader (developer, designer, or Plamedi) actually needs before using
  anything else on the site.

  Background:
    Given I open the component library page

  Scenario: Start Here has a real table of contents, not just a link list
    When I scroll to the "sec-starthere" section
    Then that section should contain a table

  Scenario: About This Site names the organisation and founder
    When I scroll to the "sec-aboutsite" section
    Then the text in that section should mention "AFJ Cardiff"
    And the text in that section should mention "Plamedi"

  Scenario: The Glossary has real term/definition entries
    When I scroll to the "sec-glossary" section
    Then that section should contain at least 5 glossary entries
    And every glossary entry should have both a term and a definition

  Scenario: The Glossary defines the site's own core vocabulary
    When I scroll to the "sec-glossary" section
    Then the glossary should define the term "ADR"
    And the glossary should define the term "Design token"
