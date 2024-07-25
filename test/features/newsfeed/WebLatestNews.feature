@Web @AODS-5895 @AODS-6107
Feature: AO Web-News Feed

  As a user,
  I would like to see the latest news on home page.
  So, I can read the latest news articles

  Background:
    Given I am on AO web home page
    When I navigate to "News" under "NEWS"
    Then I can see the News page

  @Smoke
  Scenario: I can navigate to the various news tiles within the news page
    When I see article card titled "Hewitt to be inducted into Australian Tennis Hall"
    Then I click on article "Hewitt to be inducted into Australian Tennis Hall"
  @Smoke
  Scenario: I can load more news articles from the news page
    When I click Load More button after scrolling down
    Then I see article card titled "The rise of Ben Shelton"

  Scenario: clicking on an AO Match Highlight video upon scrolling twice to right
    Then I see "AO Match Highlights"
    Then I click on video "Alfie Hewett v Tokito Oda Match Highlights (F) | Australian Open 2023" under "AO Match Highlights" click on the arrow "2" times

  Scenario: clicking on an AO Match Highlight video without scrolling to right
    Then I see "AO Match Highlights"
    Then I click on video "Stefanos Tsitsipas v Novak Djokovic Highlights (F) | Australian Open 2023" under "AO Match Highlights" click on the arrow "0" times

  Scenario: clicking on an AO Match Highlight video scrolling thrice to right
    Then I see "AO Interviews"
    Then I click on video "Karen Khachanov Press Conference | Australian Open 2023 Semifinal " under "AO Interviews" click on the arrow "3" times

   Scenario: clicking on an AO Match Highlight video without scrolling tw0ice to right
    Then I see "Infosys Shot of the Day"
    Then I click on video "Krejcikova fires a pass | Infosys shot of the day | Day 7" under "Infosys Shot of the Day" click on the arrow "5" times
