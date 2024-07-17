# Precondition:
# Before runing with the following scnearios, the AO simulator should atleast be run from day 1 up to day 2.

@App @Ios
Feature: AO App Match Details

  As a user,
  I would like to see the match card on draws page.
  So, I can view match details

  Background:
    Given I am on AO app Home screen

  Scenario: can see player names on the match details screen
    When I navigate to "Draws" screen
    And I select score card with following players on Draws screen
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    Then I see the following players on match details screen
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |

  Scenario: can see doubles player names on the match details screen
    When I navigate to "Draws" screen
    And I select "Men's Doubles" from dropdown on Draws screen
    When I select score card with following players on Draws screen
      | playerOneName | playerTwoName | playerThreeName | playerFourName |
      | W. Koolhof    | N. Skupski    | A. Bublik       | J. Smith       |
    Then I see the following players on match details screen
      | playerOneName | playerTwoName | playerThreeName | playerFourName |
      | W. Koolhof    | N. Skupski    | A. Bublik       | J. Smith       |

  Scenario: can see the match details on the match card
    When I navigate to "Draws" screen
    And I select score card with following players on Draws screen
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    Then I see folowing match card details on Draws screen
      | playerOneName      | playerTwoName | playerOneScore | playerTwoScore | matchStatus | matchDuration | matchRound                |
      | R. Carballes Baena | N. Djokovic   | 3,4,0          | 6,6,6          | Complete    | 2h 2m         | Round 1 • Rod Laver Arena |

  Scenario: can see the doubles match details on the match card
    When I navigate to "Draws" screen
    And I select "Men's Doubles" from dropdown on Draws screen
    When I select score card with following players on Draws screen
      | playerOneName | playerTwoName | playerThreeName | playerFourName |
      | W. Koolhof    | N. Skupski    | A. Bublik       | J. Smith       |
    Then I see folowing match card details on Draws screen
      | playerOneName | playerTwoName | playerThreeName | playerFourName | playerOneScore | playerTwoScore | matchStatus | matchDuration | matchRound |
      | W. Koolhof    | N. Skupski    | A. Bublik       | J. Smith       | 6,6            | 1,2            | Complete    | 51m           | Round 1    |

  Scenario: can see commentry section selected on the match details page
    When I navigate to "Draws" screen
    And I select score card with following players on Draws screen
      | playerOneName | playerTwoName |
      | R. Carballes Baena | N. Djokovic  |
    And I navigate to "Point by Point" section
    Then I see "Commentary not available" heading on screen

  Scenario: can see the stats section on the match details page
    When I navigate to "Draws" screen
    And I select score card with following players on Draws screen
      | playerOneName | playerTwoName |
      | R. Carballes Baena | N. Djokovic     |
    And I navigate to "Statistics" section
    Then I see "Service" heading on screen

  Scenario: can see the highlights section on the match details page from Draws screen
    When I navigate to "Draws" screen
    And I select score card with following players on Draws screen
      | playerOneName | playerTwoName |
      | R. Carballes Baena | N. Djokovic     |
    And I navigate to "Highlights" section
    Then I see highlights details

  Scenario: can see the highlights section on the match details page from the Home screen
    When I navigate to Highlights section from home screen
    Then I see highlights details
