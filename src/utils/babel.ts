/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import generate_ from '@babel/generator';
import parse_ from '@babel/parser';
import traverse_ from '@babel/traverse';

type BabelGenerate = typeof import('@babel/generator').generate;
export const generate = (generate_.generate ?? generate_.default ?? generate_) as BabelGenerate;

type BabelParse = typeof import('@babel/parser').parse;
// @ts-expect-error
export const parse = (parse_.parse ?? parse_.default ?? parse_) as BabelParse;

type BabelTraverse = typeof import('@babel/traverse').default;
// @ts-expect-error
export const traverse = (traverse_.traverse ?? traverse_.default ?? traverse_) as BabelTraverse;
