@Web @AODS-6081
Feature: AO Web HomePage- Latest News

  As a user,
  I would like to see the news on home page. 
  So, I can read the latest news articles

  Background:
    Given I am on AO web home page
    Then I can see the "Latest News" section
     
  @Smoke
  Scenario: I can click on the news article on HomePage
    When I click on article "Hewitt to be inducted into Australian Tennis Hall"
    Then I see article titled "Hewitt to be inducted into Australian Tennis Hall"