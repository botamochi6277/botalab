import { Box, Link, Typography } from "@mui/material";

type Node = { key: string; workId?: string; label: string; date: string; main?: boolean };

const toDate = (d: string) => new Date(d).toISOString().slice(0, 10);

// Horizontal git-graph style timeline: one lane, oldest on the left.
export default function WorkTimeline(props: {
  works: WorkData[];
}) {
  const { works } = props;
  const nodes: Node[] = works
    .filter((w) => w.createDate)
    .map((w) => ({
      key: w.id,
      workId: w.id,
      label: w.name,
      date: toDate(w.createDate as string),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (nodes.length < 2) return null;

  const colWidth = 140;
  const lineY = 60;

  return (
    <Box sx={{ overflowX: "auto", pb: 1 }}>
      <Box
        sx={{
          position: "relative",
          width: nodes.length * colWidth,
          minWidth: "100%",
          height: lineY * 2,
        }}
      >
        {/* lane */}
        <Box
          sx={{
            position: "absolute",
            left: colWidth / 2,
            right: colWidth / 2,
            top: lineY - 1,
            height: 2,
            bgcolor: "primary.main",
          }}
        />
        {nodes.map((n, i) => {
          const above = i % 2 === 0;
          return (
            <Box
              key={n.key}
              sx={{
                position: "absolute",
                left: i * colWidth,
                width: colWidth,
                top: 0,
                height: "100%",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: lineY - 7,
                  width: 14,
                  height: 14,
                  ml: "-7px",
                  borderRadius: "50%",
                  border: 2,
                  borderColor: "primary.main",
                  bgcolor: n.main ? "primary.main" : "background.paper",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: 4,
                  right: 4,
                  ...(above
                    ? { bottom: lineY + 12 }
                    : { top: lineY + 12 }),
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="div"
                >
                  {n.date}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  noWrap
                  title={n.label}
                  sx={{ fontWeight: n.main ? "bold" : undefined }}
                >
                  {n.workId ? (
                    <Link
                      href={`#work-${n.workId}`}
                      underline="hover"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(`work-${n.workId}`)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {n.label}
                    </Link>
                  ) : (
                    n.label
                  )}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
