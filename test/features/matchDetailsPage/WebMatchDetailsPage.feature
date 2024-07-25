@Web @AODS-5893
Feature: AO Web - Match Card

  As a user,
  I would like to see the match card on draws page.
  So, I can view match details

  Background:
    Given I am on AO web home page
    And I navigate to "Draws" under "TOURNAMENT"
    And I navigate to the '1st Round'

  @Smoke
  Scenario: can see player names on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    Then I see the following players on match details page
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |


  # TODO: This sometimes fails on mobile as when a match card is opened, the page autoscrolls down
  #       and the match card component changes to a sticky bar at the top of the screen
  @Smoke
  Scenario: can see doubles player names on the match details screen
    When I filtered matches by event "Men's Doubles"
    And I navigate to the '1st Round'
    And I select score card with following players
      | playerOneName | playerTwoName | playerThreeName | playerFourName |
      | W. Koolhof    | N. Skupski    | A. Bublik       | J. Smith       |
    Then I see the following players on match details page
      | playerOneName | playerTwoName | playerThreeName | playerFourName |
      | W. Koolhof    | N. Skupski    | A. Bublik       | J. Smith       |

# Use : to separate tiebreakers e.g. 6:5,7:8,6
  @Smoke
  Scenario: can see the match details on the match card
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    Then I see following details on match card
      | playerOneName      | playerTwoName | playerOneScore | playerTwoScore | matchStatus | matchDuration | matchRound                |
      | R. Carballes Baena | N. Djokovic   | 3,4,0          | 6,6,6          | Complete    | 2h 2m         | Round 1 • Rod Laver Arena |

  Scenario: can see commentry section selected on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    Then I see the "Commentary" section open

  Scenario:can see commentary section selected on the match details page for singles match
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    When I change the dropdown to "2"
    Then I see the "Commentary" section open
    Then I validate the text of commentary for Point to "R. Carballes Baena loses the point with a Backhand Unforced Error"

  Scenario: can see commentary section selected on the match details page for a doubles match
    When I filtered matches by event "Men's Doubles"
    And I navigate to the '1st Round'
    And I select score card with following players
      | playerOneName | playerTwoName | playerThreeName | playerFourName |
      | W. Koolhof    | N. Skupski    | A. Bublik       | J. Smith       |
    When I change the dropdown to "1"
    Then I see the "Commentary" section open
    Then I validate the text of commentary for Point to "Bublik/Smith lose the point with a Backhand Unforced Error"

  Scenario: can see the Stats section on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    And I navigate to Stats section
    Then I see the "Stats" section open

  Scenario:can see verify the Stats data
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    And I navigate to Stats section
    When I change the stat dropdown to "Set 3"
    Then I see the "Stats" section open
    Then I validate the values of "Service points played" to "8" and "9"

  Scenario: can see the stats section on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    And I navigate to Report section
    Then I see the "Report" section open

  Scenario: can see the Media section on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    And I navigate to Media section
    Then I see the "Media" section open

  Scenario: can see the Rally Analysis section on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    And I navigate to Rally Analysis section
    Then I see the "Rally Analysis" section open

  Scenario: can see the Stroke Summary section on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    And I navigate to Stroke Summary section
    Then I see the "Stroke Summary" section open

  Scenario: can see the CourtVision section on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    And I navigate to CourtVision section
    Then I see the "CourtVision" section open

  Scenario: can see the 3D CourtVision section on the match details page
    When I select score card with following players
      | playerOneName      | playerTwoName |
      | R. Carballes Baena | N. Djokovic   |
    And I navigate to 3D CourtVision section
    Then I see the "3D CourtVision" section open

  @AODS-5947 @Live
  Scenario: can see "Retired" status on the match card on the match details page
    When I filtered matches by event "Men's Singles"
    And I navigate to the 'Quarterfinals'
    And I select score card with following players
      | playerOneName | playerTwoName |
      | K. Khachanov  | S. Korda      |
    Then I see "Retired" as status on match details page

  @AODS-5948 @Live
  Scenario: can see "Complete" status on the match card on the match details page
    When I filtered matches by event "Women's Singles"
    And I navigate to the '1st Round'
    And I select score card with following players
      | playerOneName | playerTwoName |
      | I. Swiatek    | J. Niemeier   |
    Then I see "Complete" as status on match details page

  @AODS-5950 @Live
  Scenario: can see "On Court" status on the match card on the match details page
    When I filtered matches by event "Women's Singles"
    And I navigate to the '1st Round'
    And I select score card with following players
      | playerOneName | playerTwoName |
      | J. Pegula     | J. Cristian   |
    Then I see "On Court" as status on match details page

  @AODS-5951 @Live
  Scenario: can see "Warm-up" status on the match card on the match details page
    When I filtered matches by event "Men's Singles"
    And I navigate to the '1st Round'
    And I select score card with following players
      | playerOneName | playerTwoName |
      | K. Edmund     | J. Sinner     |
    Then I see "Warm-up" as status on match details page

  @AODS-5953 @Live
  Scenario: can see "Live" status on the match card on the match details page
    When I filtered matches by event "Women's Singles"
    And I navigate to the '1st Round'
    And I select score card with following players
      | playerOneName | playerTwoName |
      | K. Siniakova  | C. Gauff      |
    Then I see "Live" as status on match details page

  @AODS-5954 @Live
  Scenario: can see "Scheduled" status on the match card on the match details page
    When I filtered matches by event "Men's Singles"
    And I navigate to the '1st Round'
    And I select score card with following players
      | playerOneName | playerTwoName |
      | R. Nadal      | J. Draper     |
    Then I see "Scheduled" as status on match details page

  @AODS-5955 @Live
# To see Suspended matches, pause SIM on Day 3 (01/18) at 02:17:41
 Scenario: can see "Suspended" status on the match card on the match details page
    When I filtered matches by event "Men's Singles"
    And I navigate to the '1st Round'
    And I select score card with following players
      | playerOneName | playerTwoName |
      | T. Kokkinakis | F. Fognini    |
    Then I see "Suspended" as status on match details page

