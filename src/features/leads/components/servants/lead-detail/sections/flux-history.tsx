import { User } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { Button } from "@/shared/components/ui/button";

import { STATUS_MAP } from "../../../../consts/status-map";
import { type TLeadExecutionStatus } from "../../../../consts/execution-status";
import { getStepName } from "../../../../utils/get-step-name";
import { type TLeadAllSteps } from "../../../../consts/steps";
import { formatDate } from "@/shared/utils/formaters/format-data";
import type { FlowStep } from "../../../../types/lead.model";

interface LeadFluxHistoryProps {
  flowSteps: FlowStep[];
}

export const LeadFluxHistory = ({ flowSteps }: LeadFluxHistoryProps) => {
  const stepsByFlow = flowSteps.reduce((acc, item) => {
    const current = acc[item.flowName];
    if (!current || new Date(item.executedAt) > new Date(current.executedAt)) {
      acc[item.flowName] = item;
    }
    return acc;
  }, {} as Record<string, FlowStep>);
  
  const sortedSteps = Object.values(stepsByFlow).sort(
    (a, b) => new Date(b.executedAt).getTime() - new Date(a.executedAt).getTime()
  );

  console.log(sortedSteps)
  return (
    <div className="w-full flex-1 space-y-2 mt-8">
      <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-4 px-2">
        Histórico de Execução
      </h3>
      <div className="relative px-2">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800" />

        {sortedSteps.length > 0 ? (
          sortedSteps.map((step, index) => {
            const isLastStatus = index === 0;
            const statusConfig = STATUS_MAP[step.status as TLeadExecutionStatus];
            const stepName = getStepName(
              step.flowName as TLeadAllSteps,
              step.status as TLeadExecutionStatus
            );

            if (!stepName) return null;

            return (
              <div
                key={index}
                className="relative flex items-center gap-4 py-3"
              >
                <div
                  className={`relative z-10 flex items-center justify-center size-8 rounded-full border-2 bg-white dark:bg-zinc-950 ${
                    statusConfig.color || "text-zinc-400"
                  } ${isLastStatus ? "ring-2 ring-blue-100 dark:ring-blue-900 ring-offset-2 dark:ring-offset-zinc-950" : ""}`}
                >
                  {statusConfig?.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {stepName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <p className="text-xs text-zinc-500">
                          {formatDate(step.executedAt)}
                        </p>
                        {step.user && step.user.username !== "" && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                            <User className="h-3 w-3 text-zinc-500" />
                            <span className="text-[10px] text-zinc-500 truncate max-w-[120px]">
                              {step.user.username}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div
                        className={`size-2 rounded-full ${
                          statusConfig.color.replace("text-", "bg-") || "bg-zinc-400"
                        }`}
                      />

                      {statusConfig.text === "Falhou" ||
                      statusConfig.text === "Rodou com falha" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                            >
                              Motivo
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="left"
                            align="center"
                            className="max-w-xs"
                          >
                            <p className="text-sm">
                              {step.technicalResponseDetails?.description || "Sem detalhes técnicos."}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span className="text-xs text-zinc-500 whitespace-nowrap">
                          {statusConfig.text || "N/A"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-zinc-500 text-center py-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
            Nenhum histórico de execução encontrado.
          </p>
        )}
      </div>
    </div>
  );
};
