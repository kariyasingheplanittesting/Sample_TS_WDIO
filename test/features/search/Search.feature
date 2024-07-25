@Web @AODS-5762 @Smoke
Feature: Search

  As a user,
  I would like to search the site content

  Background:
    Given I am on AO web home page


  Scenario: I can search for player profile

    When I click on the search option
    And I see the search bar
    Then I enter search as "Rafael" and see the results
    And I click on "Rafael Nadal [ESP]"
    Then I see the player profile page of "Rafael Nadal"

  Scenario: I can search for news article

    When I click on the search option
    And I see the search bar
    Then I enter search as "Novak Djokovic" and see the results
    And I click on "Report: Number 10 for Novak sees Djokovic join Nadal"
    Then I see the related news article with heading "Report: Number 10 for Novak sees Djokovic join Nadal"

  Scenario: I can search for video

    When I click on the search option
    And I see the search bar
    Then I enter search as "barty" and see the results
    And I click on "Madison Keys Press Conference (QF) | Australian Open 2022"
    Then I see the related video with title "Madison Keys Press Conference (QF) | Australian Open 2022"