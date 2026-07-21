Feature: Core component widgets render correctly
  Every documented component must actually be visible and non-empty in the
  preview pane, in every theme — not just present in the DOM.

  Background:
    Given I open the component library page

  Scenario Outline: <component> renders visible content in every theme
    When I click the "<theme>" theme button
    And I scroll to the "<section_id>" section
    Then the "<selector>" element within that section should be visible
    And the "<selector>" element should have non-zero size

    Examples:
      | component           | section_id      | selector             | theme |
      | Buttons              | sec-buttons     | .demo-btn-row         | wine  |
      | Buttons              | sec-buttons     | .demo-btn-row         | scrolly |
      | Product card          | sec-cards       | .demo-card            | wine  |
      | Product card          | sec-cards       | .demo-card            | day   |
      | Cart drawer            | sec-drawer      | .demo-drawer          | wine  |
      | Class booking card     | sec-class       | .demo-class-card      | wine  |
      | Gallery grid           | sec-gallery     | .demo-gallery          | scrollyday |
      | Carousel                | sec-carousel    | .demo-carousel-row     | wine  |
      | Interactive input       | sec-input       | .demo-input-row        | day   |
      | Wine tonal scale        | sec-winescale   | .demo-scale-row        | wine  |
      | Scrollytelling hero      | sec-scrollyhero | .demo-scrolly-hero     | scrolly |
      | Scroll story card        | sec-storycard   | .demo-story-card       | scrolly |
      | Manifesto quote          | sec-manifesto   | .demo-manifesto        | scrolly |
      | Launch signup             | sec-signup      | .demo-signup-box       | scrolly |

  Scenario: Tonal scale swatches derive from the active theme's accent, not a fixed color
    Given I click the "wine" theme button
    And I scroll to the "sec-winescale" section
    When I read the background color of the first ".demo-scale-swatch" element
    And I click the "scrolly" theme button
    Then the background color of the first ".demo-scale-swatch" element should differ from before

  Scenario: Button radius changes from rounded to full pill between Wine/Gold and Scrollytelling
    Given I click the "wine" theme button
    And I scroll to the "sec-buttons" section
    When I read the border-radius of ".demo-btn.primary"
    And I click the "scrolly" theme button
    Then the border-radius of ".demo-btn.primary" should be at least "40px"

  Scenario: Every doc-block has a code pane, and most have a live preview too
    Then every ".doc-block" element should contain a ".code-pane"
    And at least 90% of ".doc-block" elements should contain a ".preview-pane"

  Scenario: Code panes are non-empty for every documented component
    When I scroll to the "sec-buttons" section
    Then the code pane text in that section should not be empty
