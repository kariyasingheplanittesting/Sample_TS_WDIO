@App @Ios @Android @debug @test
Feature: AO App Newsfeed

  As a user,
  I would like to verify the newsfeed on the home screen
  So, I can watch latest news

  Background:
    Given I am on AO app Home screen
    And I see "News feed" on home screen

  Scenario: can see the newsfeed on the home screen
    Then I see "News feed" on home screen

  Scenario: can see more details about the news feed
    When I open news "AO Flashback: Seles reaches zenith with 1993 triumph over Graf" from news feeds
    Then I see more details about the news
      | authorName    | title                                                          | publisedDate |
      | Matt Trollope | AO Flashback: Seles reaches zenith with 1993 triumph over Graf | 26 July 2023 |
  # //ausopen.com
  # Scenario: can horizontally scroll to see more news feeds
  #   When I scroll right from "AO Flashback: Seles reaches zenith with 1993 triumph over Graf" to "Alcaraz becoming a great, by dethroning a great, in epic Wimbledon final" on the news panel
  #   Then I see "Alcaraz becoming a great, by dethroning a great, in epic Wimbledon final" news title

  # Scenario: can see news details after horizontally scrolling
  #   When I scroll right from "Aussie summer update: Djokovic, Medvedev headline Adelaide, former champs back in Hobart" to "AO Finals Festival set to change the game" on the news panel
  #   And I open news "Radwanska, Henman, Dulko among stars to captain United Cup teams" from news feeds
  #   Then I see more details about the news
  #     | authorName  | title                                                            | publisedDate    |
  #     | ausopen.com | Radwanska, Henman, Dulko among stars to captain United Cup teams | 9 December 2022 |
