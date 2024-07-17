@Web
Feature: AO Web-News Feed

  As a user,
  I would like to see the latest news on home page. 
  So, I can read the latest news articles

  Background:
    Given I am on AO web home page
  
  Scenario: can see the Latest News on the home page
    Then I can see the latest News
  
  Scenario: can navigate to All News page
    When I navigate to 'News' under 'NEWS'
    Then I can see the News page
 
  Scenario: can see news details on News articles page
    When I open a news article
    Then I can see the news details

  Scenario: can navigate to AO live radio page
    When I navigate to Ao Live Radio page
    Then I can see "Listen to the AO" title on AO radio

  Scenario: can navigate to AO show page
    When I navigate to The AO Show page
    Then I can see "Listen to the AO" title on AO podcast

    Scenario: can navigate to Listen to the AO page and verify the heading
    When I navigate to The AO Show page
    Then I can see "Action Audio presented by Mastercard" heading
