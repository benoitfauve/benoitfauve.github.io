---
title: "The rise of audio deepfakes: implications and challenges"
date: 2023-02-20 11:00:00 +0000
categories:
  - repost
  - blog
link: https://www.linkedin.com/pulse/rise-audio-deepfakes-implications-challenges-benoit-fauve/
tags:
  - deepfake
---

**Original article:** [LinkedIn](https://www.linkedin.com/pulse/rise-audio-deepfakes-implications-challenges-benoit-fauve/)

**February 20, 2023**

Audio deepfakes have become a growing concern as the technology used to create them has rapidly advanced in recent years. Novel approaches, such as the VALL-E Text-To-Speech (TTS) system developed by Microsoft, claim to synthesize voices with only three seconds of audio from the targeted speaker. Microsoft’s VALL-E research paper was published in early January 2023 and was followed in February by a similar piece of work by Google’s SPEAR-TTS. These technologies are part of a wider development called generative AI, whose recent breakthroughs have been making the headlines over the last months and includes image generation (DALL-E, Stable diffusion, Midjourney,…) and text generation (ChatGPT,…).

## Illustrating Current Detection Capabilities

Although detecting audio deepfakes has proven challenging, ValidSoft have always been at the forefront of this dimension of speech science and integrating the latest AI audio deepfake detection into their process for years. We were part of a consortium of academic and private partners from 2015 to 2017 for the multimillion-euro EU funded H2020 Octave project. In this project, ValidSoft worked with two of the research institutes who are long-term organizers of the most famous series of academic challenges for audio fake detection, ASVspoof. It is worth noting that the term "deepfake" was first coined in late 2017 by a Reddit user of the same name, years after ValidSoft’s first release of a fake audio detector.

While VALL-E cannot be fully tested, because no pre-trained model has yet been made available, the few examples shared as on VALL-E page can be distinguished as fake by ValidSoft's synthetic voice detection module when compared to genuine audio.

![Profiling VALL-E and genuine audio files](pics/valle.png)  
*Profiling VALL-E and genuine audio files*

This same synthetic voice detection module has already recently distinguished a fake Emma Watson voice created by ElevenLabs TTS.

## Challenge and Future

Detecting audio deepfakes remains an ongoing process, and poses specific challenges over the telephony channel. Unlike high-quality laptop/smartphone recordings, legacy telephony channels carry less information and have smaller frequency bandwidth, meaning the audio quality overall is lower and this means some of the artifacts created by the neural vocoders can be lost. Nevertheless, ValidSoft’s detection capabilities work effectively and offer a further tool, or layer, of protection. The future of combating audio deepfakes will involve a mix of detection techniques, including audio watermarking, and mitigation strategies. Recently, companies like Resemble.ai and Microsoft have announced that they will include audio watermarking in their TTS products. Given the rapid advancement of generative AI technology, it is likely that new detection and mitigation strategies will need to be continually developed and refined to keep up with the changing landscape of audio deepfakes.

The development of audio deepfake technology raises important questions about the ethics and potential consequences of this technology. While the technology itself is not inherently good or bad, its potential for misuse underscores the need for responsible use and regulation of AI technologies. It's vital to carefully consider the implications of new technologies like audio deepfakes and take steps to ensure that they are used ethically and responsibly, as well as taking pro-active measures to combat nefarious uses and new fraud vectors.
