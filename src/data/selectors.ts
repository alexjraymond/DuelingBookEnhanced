/**
 * Centralized DOM selectors used to query elements on the DuelingBook page.
 * Using an enum keeps selectors consolidated, reusable, and easy to update
 * if the site's markup ever changes.
 */
export enum EDOMElements {
  View = "view",
  CardMenuContent = "card_menu_content",
  ChatInput = "input.cin_txt",
  ExitButton = "exit_btn",
  CardMenuButton = "card_menu_btn",
  DeckHidden = "deck_hidden",
  ExtraDeckHidden = "extra_hidden",
  LifePointsInput = "life_txt",
  SubtractButton = "plus_btn",
  AddButton = "minus_btn",
  ThinkButton = "think_btn",
  ThumbsUpButton = "good_btn",
  GraveyardHidden = "grave_hidden",
  BanishedHidden = "banished_hidden",
  SkipIntroButton = "skip_intro_btn",
  DuelButton = "duel_btn",
}
