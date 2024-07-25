@Web

Feature: Live Scores

  As a user,
  I would like to see functionalities of 'Live Scores' Page

  Background:
    Given I am on AO web home page
    When I navigate to "Live Scores" under "Tournament"
    Then I see 'Live Scores' page

  @AODS-5808
  Scenario: can open players profile using Live Scores page and verify the player’s details
    When I click on name of player "S. Tsitsipas "
    Then I see all details of the player
      | Player             | SinglesRank | DoublesRank | Age      | Born           | Height            | Weight         | PlayingHand  |
      | Stefanos Tsitsipas | 5           | 209         | 25 years | Athens, Greece | 193cm (6 ft 4 in) | 90kg (198 lbs) | Right-handed |

  @AODS-5941 @Live
  Scenario: can see "On Court" status on the Matchcard on Live Scores page
    Then I see "On Court" as status on Matchcard on Live Scores page
      | playerOneName | playerTwoName |
      | S. Tsitsipas  | Q. Halys      |

  @AODS-5939 @Live
  Scenario: can see "Warm-up" status on the Matchcard on Live Scores page
    Then I see "Warm-up" as status on Matchcard on Live Scores page
      | playerOneName | playerTwoName |
      | S. Tsitsipas  | Q. Halys      |

  @AODS-5938 @Live
  Scenario: can see "Live" status on the Matchcard on Live Scores page
    Then I see "Live" as status on Matchcard on Live Scores page
      | playerOneName | playerTwoName |
      | S. Tsitsipas  | Q. Halys      |

  @AODS-5937 @Live
  Scenario: can see "Complete" status on the Matchcard on Live Scores page
    Then I see "Complete" as status on Matchcard on Live Scores page
      | playerOneName | playerTwoName |
      | S. Tsitsipas  | Q. Halys      |

  @AODS-5936 @Live
  # To see suspended matches, start SIM on Day 2 (01/17) at 23:35:36
  Scenario: can see "Suspended" status on the Matchcard on Live Scores page
    Then I see "Suspended" as status on Matchcard on Live Scores page
      | playerOneName | playerTwoName |
      | T. Kokkinakis | F. Fognini    |