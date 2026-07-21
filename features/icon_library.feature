Feature: Icon library
  Every icon is real inline Lucide SVG (stroke="currentColor"), themeable
  across all four modes, organised into named categories.

  Background:
    Given I open the icon library page

  Scenario: All nine categories are present
    Then I should see the following icon categories:
      | Core UI                       |
      | Commerce                      |
      | Checkout flow                 |
      | Classes and booking           |
      | Account and dashboard         |
      | Filter, sort, and discovery   |
      | Social proof                  |
      | Scrollytelling and story      |
      | Governance and operations     |

  Scenario: Every icon card has a visible SVG, a name, and a copyable snippet
    Then every icon card should contain a visible "svg" element
    And every icon card should contain a non-empty icon name
    And every icon card should contain a non-empty code snippet

  Scenario Outline: Icon color follows the active theme
    When I click the "<theme>" theme button
    Then icon color should match the "<theme>" theme's text color

    Examples:
      | theme      |
      | wine       |
      | scrolly    |
      | day        |
      | scrollyday |

  Scenario: Accent-variant icons are visually distinct from default icons
    When I read the color of an icon marked as an accent variant
    And I read the color of an icon marked as default
    Then the two colors should differ

  Scenario: No icon card is empty or broken
    Then every icon card's SVG should contain at least one visible path or line element
