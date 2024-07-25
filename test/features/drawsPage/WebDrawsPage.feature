@Web
Feature: AO Web-Draws

  As a user,
  I would like to see the match draws details. So, I can see the all match events

  Background:
    Given I am on AO web home page
    And I navigate to "Draws" under "TOURNAMENT"
    And I see Draws page has loaded

  Scenario: can see Match Events on 'Draws' page
    Then I can see the match events filter

  Scenario: can see Men's Singles as default option in events
    Then I can see the "Men's Singles" as default event
    
  @AODS-6051
  Scenario: can see matches for the selected event
    When I filtered matches by event <eventName>
    Then I can see matches for the event

    Examples:
      | eventName                  |
      | Men's Singles              |
      | Women's Singles            |
      | Men's Doubles              |
      | Women's Doubles            |
      | Mixed Doubles              |
      | Junior Boys' Singles       |
      | Junior Girls' Singles      |
      | Junior Boys' Doubles       |
      | Junior Girls' Doubles      |
      | Men's Wheelchair Singles   |
      | Women's Wheelchair Singles |
      | Men's Wheelchair Doubles   |
      | Women's Wheelchair Doubles |
      | Quad Wheelchair Singles    |
      | Quad Wheelchair Doubles    |
      | Men's Qualifying Singles   |
      | Women's Qualifying Singles |

  @AODS-5892 @Smoke
  Scenario: can search players in the matches for selected event
    When I filtered matches by event <eventName>
    And I search player "Murray"
    Then I see all the matches played by "Murray"

     Examples:
      | eventName                  |
      | Men's Doubles              |

  @AODS-5798 @Smoke
  Scenario: can open players profile from Draws pages and verify the player’s details
    When I click on name of player "T. Paul "
    Then I see all details of the player
      | Player     | SinglesRank | DoublesRank | Age      | Born              | Height            | Weight         | PlayingHand  |
      | Tommy Paul | 13          | 339          | 26 years | Voorhees, NJ, USA | 185cm (6 ft 1 in) | 82kg (180 lbs) | Right-handed |




