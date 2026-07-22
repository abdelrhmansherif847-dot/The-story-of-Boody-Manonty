# 🎵 Adding music

The experience is **ready for music** whenever you are.

1. Add a track named **`theme.mp3`** to this folder:
   ```
   public/audio/theme.mp3
   ```
2. That's all. The sound control appears automatically in the top bar.

Playback is gentle and considerate:

- It never autoplays — it starts only when the listener taps the sound icon
  (this respects browser autoplay rules).
- It fades in and out softly, and loops quietly in the background.
- It keeps playing through the final scene, exactly as intended.

To use a different filename, update the `src` in
`components/chrome/audio-controller.tsx`.
