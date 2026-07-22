Feature: History — changelog, roadmap, and downloads accuracy
  The Downloads section currently claims more than the file actually
  delivers (self-hosted fonts and icon SVGs that don't exist yet) — this
  is a known, real gap, documented here so it stays a deliberate decision
  rather than something that silently drifts further from the truth.

  Background:
    Given I open the component library page

  Scenario: The changelog has a substantial number of real entries
    When I scroll to the "sec-changelog" section
    Then that section should contain at least 20 changelog entries

  Scenario: The roadmap lists the Docusaurus migration as a planned item
    When I scroll to the "sec-roadmap" section
    Then the text in that section should mention "Docusaurus migration"

  Scenario: Downloads claims self-hosted fonts, which is not yet true
    When I scroll to the "sec-downloads" section
    Then the text in that section should mention "real font files"
    But there should be no actual font files served from this site's own static path

  Scenario: Downloads claims a real icon set, which is not the current mechanism
    When I scroll to the "sec-downloads" section
    Then the text in that section should mention "real icon set"
    But the icon library actually renders icons as inline SVG, not as downloadable icon files
