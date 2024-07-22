# Audios Directory

This directory contains all the audios and metadata for the audio streaming feature.

## Assets Directory

> Every audio should be contained within a directory inside the `assets` folder.

1. The audio file should be named `audio.mp3` (must have a `mp3` extension).
1. The thumbnail image should be named `thumbnail.avif` (must have a `avif` extension).
1. The metadata for the audio should be stored inside a `metadata.json` file.

## metadata-schema.json

This file contains the type definitions for the `metadata.json` files.

## output/audio-metadata.ts

> Generated via `npm run generate:audio-metadata`

The type definitions of the metadata from the schema file.
