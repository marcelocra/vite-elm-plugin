import { PluginOption, UserConfig } from "vite";
type ElmCompilerPluginOptions = {
    elmInputMain?: string;
    elmJsOutputTo?: string;
    shouldOptimizeOutput?: boolean;
    ignoreElm?: boolean;
    extraConfigs?: Pick<UserConfig, "build">;
};
type ElmMakeCommandOptions = {
    elmMakeInput: string;
    elmMakeOutput: string;
    shouldOptimize: boolean;
};
export declare function elmMakeCommand(opts: ElmMakeCommandOptions): string;
export declare function elmCompilerPlugin({ elmInputMain, elmJsOutputTo, shouldOptimizeOutput, ignoreElm, extraConfigs, }?: ElmCompilerPluginOptions): PluginOption;
export {};
