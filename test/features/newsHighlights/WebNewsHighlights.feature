@Web
Feature: AO Web-Highlights

  As a user,
  I would like to see the 'News Highlights' on Highlights page.

  Background: 
    Given I am on AO web home page
    And I navigate to 'News' under 'NEWS'
    And I see 'News' page is loaded

  Scenario: navigating to 'Highlights' page
    Then I see news highlights
    And I see "4" news articles

  Scenario: can see component container headings
    Then I see "AO Match Highlights"
    And I see "AO Interviews"
    And I see "Infosys Shot of the Day"

  Scenario:news Article under 'Latest News' have Title, Descripton and TimeStamp 
    Then I see list of news articles
    And I see title, description, TimeStamp for an article

  Scenario:can see News Details when clicked on any NewsArticle
    Then I see list of news articles
    And I can navigate to any news article
