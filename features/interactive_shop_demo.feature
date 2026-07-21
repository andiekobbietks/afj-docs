Feature: Interactive shop demo
  The embedded commerce mockup (product grid -> detail -> cart -> checkout ->
  confirmation) inside an iframe within component-library.html must actually
  function, including its edge cases, not just look right statically.

  Background:
    Given I open the component library page
    And I switch to the shop demo iframe

  Scenario: The shop opens on the product grid
    Then the product grid should be visible
    And at least one product card should be visible

  Scenario: Opening a product shows its detail view
    When I click the first product card
    Then the product detail view should be visible
    And a "Back to shop" control should be visible

  Scenario: The back control returns to the grid
    Given I click the first product card
    When I click "Back to shop"
    Then the product grid should be visible

  Scenario: Selecting a size marks it as selected and no other size
    Given I click the first product card
    When I select size "L"
    Then size "L" should be marked selected
    And size "M" should not be marked selected

  Scenario: Quantity cannot go below 1
    Given I click the first product card
    When I decrease quantity 5 times
    Then the quantity should read "1"

  Scenario: Quantity increases without an upper bound causing a display error
    Given I click the first product card
    When I increase quantity 20 times
    Then the quantity should read "21"
    And the quantity display should not overflow its container

  Scenario: Adding an item opens the cart with the correct line item
    Given I click the first product card
    When I add the item to the cart
    Then the cart drawer should be open
    And the cart should contain 1 line item

  Scenario: Cart badge count matches the number of items added
    Given the cart is empty
    When I add 3 different items to the cart
    Then the cart count badge should read "3"

  Scenario: Removing the only item in the cart empties it, not errors
    Given I add 1 item to the cart
    And I open the cart
    When I remove that item
    Then the cart should contain 0 line items
    And no JavaScript error should have occurred

  Scenario: Closing the cart via the scrim returns focus sensibly
    Given I open the cart
    When I click the drawer scrim
    Then the cart drawer should be closed

  Scenario: Closing the cart via Escape works the same as the close button
    Given I open the cart
    When I press "Escape"
    Then the cart drawer should be closed

  Scenario: Product image zoom opens and closes correctly
    Given I click the first product card
    When I click the product gallery to zoom
    Then the zoom overlay should be visible
    When I click the zoom overlay
    Then the zoom overlay should be closed

  Scenario: Product image zoom can also be closed with Escape
    Given I click the first product card
    And I click the product gallery to zoom
    When I press "Escape"
    Then the zoom overlay should be closed

  Scenario: Every interactive control in the shop demo is keyboard-operable
    Then every clickable control in the shop demo should be keyboard-operable
