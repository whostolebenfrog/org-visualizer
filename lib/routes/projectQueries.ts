/*
 * Copyright © 2019 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ProjectAnalysis } from "@atomist/sdm-pack-analysis";
import { CodeStats } from "@atomist/sdm-pack-sloc/lib/slocReport";
import { CodeMetricsElement } from "../element/codeMetricsElement";
import {
    ReportBuilder,
    treeBuilder,
} from "../tree/TreeBuilder";

/**
 * Languages used in this project
 * @type {ReportBuilder}
 */
export const languagesQuery: ReportBuilder<ProjectAnalysis> =
    treeBuilder<ProjectAnalysis>("by language")
        .split<CodeStats>({
            namer: ar => ar.id.repo,
            splitter: ar => {
                const cme = ar.elements.codemetrics as CodeMetricsElement;
                return cme.languages;
            },
        })
        .renderWith(codeStats => {
            return {
                name: `${codeStats.language.name} (${codeStats.total})`,
                size: codeStats.total,
            };
        });
