---
type: Route
title: Cookbook
description: A collection of recipes and culinary content.
resource: https://kwagner.dev/cookbook
tags: [content, cookbook]
generated: { by: claude-code, at: 2026-10-08T15:20:00Z }
verified: { by: human:kristopher, at: 2026-10-08T15:25:00Z }
---

# Cookbook Route

This route handles the display of recipes and culinary content.

## Features

- List view of recipes.
- Detailed view for individual recipes.
- Data sourced from `recipes.json`.

## Schema

Individual recipes within this route follow the structure defined in `recipes.json`:

- **url**: Unique identifier/slug for the recipe.
- **description**: A brief summary of the dish.
- **title**: The display name of the recipe.
- **servings**: The number of people the recipe serves.
- **time**: Estimated preparation/cooking time.
- **ingredients**: A list of objects containing:
  - `quantity` (Optional)
  - `unit` (Optional)
  - `ingredient` (Required)
- **instructions**: A list of step-by-step preparation instructions.

## Examples

Example of a recipe entry:

- **url**: "walnut-pasta"
- **title**: "Walnut Pasta"
- **servings**: "2 servings"
- **time**: "15 minutes"
- **ingredients**:
  - { "quantity": 1, "unit": "tablespoon", "ingredient": "olive oil" }
  - { "quantity": "1/2", "unit": "cup", "ingredient": "walnut pieces" }
- **instructions**:
  - "In a nonstick skillet over medium-low heat, heat the oil."
  - "Add the nuts and cook, stirring frequently, for 3 to 4 minutes."
