# Kagi Summariser Extension

Firefox extension that calls [Kagi Universal Summarizer](https://kagi.com/summarizer/index.html) with the currently open page URL.

### Load
1. Download latest `.xpi` file in Releases
2. Go to `about:addons`
3. Cog -> `Install Add-on From File...`
4. Select `kagi_summariser_<VERSION>.xpi`

### Load in debug mode
1. Go to `about:debugging`
2. `Load Temporary Add-on...`
3. Select `manifest.json`

### Package
- `cd kagi_summariser/ && zip -r -FS ../kagi_summariser.zip *`
