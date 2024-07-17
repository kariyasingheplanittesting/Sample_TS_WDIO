@App @Android @Ios
Feature: AO App Favourite Player

  As a user,
  I would like to see my favourite Players on the home screen
  So I can see their details and match highlights

  Background:
    Given I am on AO app Home screen
    And I see "Favourite Players" on home screen

  Scenario: can see favourite player's profile
    When I select "B.Benoio" from Suggested Players list
    Then I can see following details on Players screen
      | name           | country     | age | singlesSeed | singlesRank | doublesSeed | doubleRank |
      | Belinda Bencic | Switzerland | 26  | -           | 15          | -           | 163        |
    | name         | country | age | singlesSeed | singlesRank | doublesSeed | doubleRank |
    | Novak Djokovic | Serbia   | 36  | 2           | 2           | -           | -       |

  Scenario: any favourite player can be added to the favourites list
    When I selected "B.Benoio" from Suggested Players list
    And I add player "Belinda Bencic" to the Favourites list
    When I selected "N. Djokovic" from Suggested Players list
    And I add player "Novak Djokovic" to the Favourites list
    Then I can see the player has "Favourited" label

  Scenario: can see favourite players in favourite players list
    When I selected "B.Benoio" from Suggested Players list
    And player "Belinda Bencic" is added to the "Favourited" list
    When I selected "A. Sabalenka" from Suggested Players list
    And player "Aryna Sabalenka" is added to the "Favourited" list
    And I am back on "Home" screen
    Then I can see "B.Benoio" is in Favourite Players list

    Then I can see "A. Sabalenka" is in Favourite Players list
  
  Scenario: can see favourite player in All players favourites list
    When I selected "A.de Minaur" from Suggested Players list
    And player "Alex de Minaur" is added to the "Favourited" list
    When I selected "N. Djokovic" from Suggested Players list
    And player "Novak Djokovic" is added to the "Favourited" list
    And I am back on "Home" screen
    And I navigate to All players screen
    Then I can see "Novak Djokovic" in Favourites section