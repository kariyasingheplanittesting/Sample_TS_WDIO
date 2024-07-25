@Web @AODS-5797@Smoke
Feature: AO Players

  As a user,
  I would like to see the player details using Players page

  Background:
    Given I am on AO web home page
    And I navigate to "Players" under "TOURNAMENT"
    And I see 'Players' page

  Scenario: I can open player's profile from Players page and see the player's details

    When I click on name of Aryna Sabalenka
    Then I see all details of the player
      | Player          | SinglesRank | DoublesRank | Age      | Born           | Residence | Height        | PlayingHand  |
      | Aryna Sabalenka | 1           | 404         | 25 years | Minsk, Belarus | N/A       | 183cm (6 ft ) | Right-handed |
 

