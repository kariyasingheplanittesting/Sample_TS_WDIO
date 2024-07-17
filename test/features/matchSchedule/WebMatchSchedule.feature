@Web
Feature: AO Web-MatchSchedule

  As a user,
  I would like to see the match schedule details.

  Background:
    Given I am on AO web home page
    And I navigate to 'Match Schedule' under 'TOURNAMENT'
    And I see 'Match Schedule' page

  Scenario: can see Days Picker panel on 'Match Schedule' page
    Then I see the Days Picker panel

  Scenario: can see all of the matches that have been played for the current default day
    Then I see following Day is active by default
      | defaultDay | date   |
      | Day 1      | 16 Jan |
    And I see scheduled matches

  Scenario: can navigate to Player Profile
    And I can see following players on match details card
      | players      |
      | K. Siniakova |
      | C. Gauff     |
    Then I can navigate to "K. Siniakova" profile by selecting the name

  Scenario: can see match details-Singles
    And I select a match card with following Players
      | players      |
      | K. Siniakova |
      | C. Gauff     |
    Then I can see following players on match details card
      | players      |
      | K. Siniakova |
      | C. Gauff     |

  Scenario: can see match details-Doubles
    And I select "Day 4"
    And I select a match card with following Players
      | players    |
      | W. Koolhof |
      | N. Skupski |
      | A. Bublik  |
      | J. Smith   |
    Then I can see following players on match details card
      | players    |
      | W. Koolhof |
      | N. Skupski |
      | A. Bublik  |
      | J. Smith   |
