@deprecated
Feature: AO Web-Player To Watch

  As a user,
  I would like to see the 'Players To watch' section is on home page.
  So, I can see more about players profiles

  Background:
    Given I am on Ao web home page
    And I see 'Player to watch' is visible on home page

  # This scenario is ONLY for desktop view and ALWAYS passes for mobile
  # TODO: fix this scenario such that it doesn't run for mobile, will probably involve
  #       updating package.json to maintain separate sets of tests and tags for mobile/web browsers
  Scenario: can view all players
    When I view all players
    Then I see the players page

  Scenario: default player is visible in the 'Players to watch'
    Then I see the following player is selected by default
      | defaultPlayer |
      | Novak Djokovic  |

  Scenario Outline: select any player and view their profile
    When I view profile of <player>
    Then I can view profile details of <player>

    Examples:
      | player         |
      | Novak Djokovic |
      | Rafael Nadal   |
