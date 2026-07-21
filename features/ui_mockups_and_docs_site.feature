Feature: UI mockups gallery and the documentation site
  The mockups page and the Docusaurus doc pages must actually be reachable
  and render real content when deployed — this is what makes the site "work"
  end to end, not just each fragment in isolation.

  Scenario: The mockups page loads with all mockup sections present
    Given I open the UI mockups page
    Then I should see the following mockups:
      | Homepage hero               |
      | Scrollytelling landing      |
      | Class listing               |
      | Class detail + booking      |
      | Shop + cart drawer          |
      | Checkout                    |
      | Member account dashboard    |
      | Internal ops dashboard      |

  Scenario: Each mockup tab actually shows content when selected
    Given I open the UI mockups page
    Then clicking through every mockup tab should reveal non-empty content each time

  Scenario Outline: Every documentation page loads successfully
    When I open the docs page "<page>"
    Then the page should return a successful status
    And the page should contain a visible "h1" heading

    Examples:
      | page                   |
      | orientation             |
      | foundations             |
      | icon-library             |
      | brand-source              |
      | for-graphic-designers      |
      | for-videographers           |
      | core-ui                      |
      | commerce                      |
      | customer-journeys               |
      | ui-mockups                       |
      | scrollytelling                    |
      | more-ui-kit                        |
      | assembly-compare                    |
      | motion                                |
      | process-adrs                            |
      | history                                  |
      | live-site-status                          |

  Scenario: The sidebar lists every documentation page
    Given I open the docs page "orientation"
    Then the sidebar should contain a link to each of the 17 documentation pages

  Scenario: Every docs page's live iframe preview actually loads content
    Given I open the docs page "core-ui"
    When I switch to the embedded preview iframe
    Then the iframe should contain visible content, not a blank page

  Scenario: Every code sample on a docs page has a working native copy button
    Given I open the docs page "core-ui"
    Then every fenced code block should have a visible copy button
    When I click the first copy button
    Then the copied content should match the code block's text

  Scenario: The homepage links to every documentation page without a 404
    Given I open the homepage
    When I click each card on the homepage in turn
    Then none of them should lead to a 404 page

  Scenario: No page on the site references the sister IP-brief site
    Given I open the homepage
    Then the page text should not contain "afj-cardiff-brief"
    And the page text should not contain "IP audit"
