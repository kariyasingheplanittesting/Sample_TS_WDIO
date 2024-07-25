@Web
Feature: AO Web-Player To Watch

  As a user,
  I would like to see the 'Featured Players' section is on home page.
  So, I can see more about players profiles
  
  @AODS-6021
  Background:
    Given I am on Ao web home page
    And I see 'Aussies at the AO' is visible on home page

  # This scenario is ONLY for desktop view and ALWAYS passes for mobile
  # TODO: fix this scenario such that it doesn't run for mobile, will probably involve
  #       updating package.json to maintain separate sets of tests and tags for mobile/web browsers
  
  @AODS-6022
  Scenario: Can scroll to the left and right by clicking on <> arrows
    When I click on left or right arrow

  @AODS-6023
  Scenario: can view all players
    When I view all players
    Then I see the players page

  # Scenario: default player is visible in the 'Players to watch'
  #   Then I see the following player is selected by default
  #     | defaultPlayer  |
  #     | Novak Djokovic |

  @AODS-6024
  Scenario Outline: can select any player and view their profile
    # When I view profile of <player>
    Then I can view profile details of <player>

    Examples:
      | player           |
      | Aleksandar Vukic |
      | Max Purcell      |
