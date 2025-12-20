// AUTO-GENERATED. DO NOT EDIT.

export const storyPropsByRoute = {
  "/loader": {
    "file": "/@fs//Users/tonylefler/projects/tonylefler-web/app/common/loader/loader.story.mdx",
    "meta": {
      "title": "Loader",
      "category": "components",
      "order": 10,
      "component": "./loader.tsx"
    },
    "componentProps": {
      "size": {
        "defaultValue": {
          "value": "\"md\""
        },
        "description": "Size of the loader",
        "name": "size",
        "declarations": [
          {
            "fileName": "tonylefler-web/app/common/loader/loader.tsx",
            "name": "TypeLiteral"
          }
        ],
        "required": false,
        "type": {
          "name": "enum",
          "raw": "LoaderSize",
          "value": [
            {
              "value": "\"xs\""
            },
            {
              "value": "\"sm\""
            },
            {
              "value": "\"md\""
            },
            {
              "value": "\"lg\""
            }
          ]
        },
        "docType": "\"xs\" | \"sm\" | \"md\" | \"lg\""
      },
      "intent": {
        "defaultValue": {
          "value": "\"primary\""
        },
        "description": "Visual style of the loader",
        "name": "intent",
        "declarations": [
          {
            "fileName": "tonylefler-web/app/common/loader/loader.tsx",
            "name": "TypeLiteral"
          }
        ],
        "required": false,
        "type": {
          "name": "enum",
          "raw": "LoaderIntent",
          "value": [
            {
              "value": "\"primary\""
            },
            {
              "value": "\"primaryReverse\""
            },
            {
              "value": "\"grey\""
            },
            {
              "value": "\"greyReverse\""
            },
            {
              "value": "\"onColor\""
            }
          ]
        },
        "docType": "\"primary\" | \"primaryReverse\" | \"grey\" | \"greyReverse\" | \"onColor\""
      }
    }
  },
  "/icon": {
    "file": "/@fs//Users/tonylefler/projects/tonylefler-web/app/common/icon/icon.story.mdx",
    "meta": {
      "title": "Icon",
      "category": "components",
      "order": 5,
      "component": "./icon.tsx"
    },
    "componentProps": null
  }
} as const;
