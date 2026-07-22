import { StoryExperience } from "@/components/story-experience";

/**
 * The entire experience is one continuous, cinematic scroll — gated by the
 * password screen, then unfolding chapter by chapter. Keeping it a single
 * route preserves the "one long film" feeling the story is meant to have.
 */
export default function Home() {
  return <StoryExperience />;
}
