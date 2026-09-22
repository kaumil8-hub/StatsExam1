(() => {
  let id = 0;
  const bank = [];

  const T = {
    foundations: "Why Research, Bias & Types of Statistics",
    variables: "Variables, Roles & Operational Definitions",
    measurement: "Qualitative, Quantitative & Measurement Scales",
    center: "Mean, Median & Mode",
    distribution: "Distributions, Box Plots, IQR & Outliers",
    spread: "Samples, Standard Deviation & Confidence Intervals",
    zci: "Z-Scores, Raw Scores & Percentiles",
    questions: "Research Questions, Hypotheses & PICO",
    errors: "Null Decisions, Type I/II Error, Power & Tails",
    reliability: "Measurement Reliability & Error",
    validity: "Measurement Validity",
    studyValidity: "Internal & External Study Validity"
  };

  const add = (topic, item) => {
    const options = [item.a, ...item.d];
    const shift = id % 4;
    const rotated = options.slice(shift).concat(options.slice(0, shift));
    bank.push({
      id: "r" + String(++id).padStart(3, "0"),
      topic,
      question: item.q,
      options: rotated,
      answer: rotated.indexOf(item.a),
      explanation: item.e,
      kind: item.k,
      page: item.p,
      objective: item.o,
      practice: Boolean(item.practice),
      review: true
    });
  };

  const section = (topic, items) => items.forEach(item => add(topic, item));

  section(T.foundations, [
    {
      k: "theory", p: "3-4", o: "purpose of statistics",
      q: "What is the strongest reason for measuring variables in research?",
      a: "Measurement turns observations into evidence that can be compared systematically.",
      d: ["Measurement guarantees that the preferred explanation is true.", "Measurement removes every possible source of bias.", "Measurement makes every variable numerical and continuous."],
      e: "Quantification creates a consistent basis for describing and comparing observations. It reduces reliance on impressions, but it does not guarantee truth."
    },
    {
      k: "theory", p: "4", o: "bias",
      q: "The review asks what researchers are guarding against when they use statistics. Which answer is most complete?",
      a: "Biased judgment, random variation, and conclusions based on misleading patterns",
      d: ["Only arithmetic mistakes made with a calculator", "Any difference between a sample and a population", "The need to define variables before collecting data"],
      e: "Systematic measurement and statistical reasoning help distinguish reproducible evidence from cognitive bias and chance patterns."
    },
    {
      k: "theory", p: "3", o: "descriptive statistics",
      q: "Which task is descriptive rather than inferential?",
      a: "Summarizing the plaque scores observed in the enrolled students",
      d: ["Using enrolled students to estimate plaque levels in all students", "Testing whether an intervention works in the target population", "Deciding whether a sample difference reflects a population difference"],
      e: "Descriptive statistics organize the data actually collected. Inferential statistics extend from a sample to a population."
    },
    {
      k: "theory", p: "3", o: "sample versus population",
      q: "Which statement correctly distinguishes a sample from a population?",
      a: "A sample is the observed subset; the population is the larger group the researcher wants to understand.",
      d: ["A sample contains only qualitative data, while a population contains quantitative data.", "A population is always smaller than its sample.", "A sample is a numerical result, while a population is a hypothesis."],
      e: "Participants actually measured form the sample. The population is the broader group to which the investigator hopes to generalize."
    },
    {
      k: "application", p: "3-4", o: "descriptive versus inferential",
      q: "A report states that the 128 participating students had a mean plaque score of 1.7. What kind of statistical use is this?",
      a: "Descriptive, because it summarizes the observed sample",
      d: ["Inferential, because every mean is a population estimate", "Inferential, because 128 is larger than 100", "Qualitative, because plaque is a health characteristic"],
      e: "The statement describes the enrolled participants only; it does not yet draw a conclusion about a larger population."
    },
    {
      k: "application", p: "3-4", o: "inference",
      q: "Investigators use results from 128 students to estimate whether the same education would improve plaque scores in all local middle-school students. This step is:",
      a: "Inferential statistics",
      d: ["A descriptive frequency only", "An operational definition", "A nominal classification"],
      e: "The investigators are using sample evidence to draw a conclusion about a target population."
    },
    {
      k: "application", p: "4", o: "confirmation bias",
      q: "A researcher expects a new implant procedure to work and emphasizes favorable follow-ups while dismissing unfavorable ones. Statistics are especially useful here because they help counter:",
      a: "Confirmation bias",
      d: ["A true zero", "Inter-rater reliability", "The interquartile range"],
      e: "Confirmation bias is selective attention to evidence that supports an existing expectation. Prespecified measures and analyses reduce that selectivity."
    },
    {
      k: "application", p: "3-4", o: "statistic versus parameter",
      q: "The mean survival time calculated from 60 sampled implants is best described as a:",
      a: "Statistic used to estimate a population parameter",
      d: ["Population parameter known without error", "Nominal variable", "Directional hypothesis"],
      e: "A numerical summary calculated from a sample is a statistic. The corresponding unknown population value is a parameter."
    }
  ]);

  section(T.variables, [
    {
      k: "theory", p: "3", o: "conceptual definition",
      q: "What does a conceptual definition do?",
      a: "States what a construct means in theory",
      d: ["Specifies the exact instrument and scoring rule", "Identifies the sample size required for power", "Assigns participants to treatment groups"],
      e: "A conceptual definition explains the meaning of an idea such as satisfaction. An operational definition specifies how it will be observed."
    },
    {
      k: "theory", p: "3", o: "operational definition",
      q: "Which feature is essential to an operational definition?",
      a: "A concrete, repeatable rule for observing or measuring the variable",
      d: ["A broad dictionary meaning only", "A guarantee that the measure is valid", "A statement that the null hypothesis is false"],
      e: "Operationalization converts an abstract construct into a procedure another researcher could repeat."
    },
    {
      k: "theory", p: "5", o: "variable roles",
      q: "Why can the same variable be independent in one study and dependent in another?",
      a: "Independent and dependent describe a variable's role in a particular research question.",
      d: ["The measurement scale changes randomly between studies.", "Every quantitative variable can only be dependent.", "Only experimental variables can have a study role."],
      e: "Variable designation is relational. A variable can be a predictor in one question and an outcome in another."
    },
    {
      k: "application", p: "5", o: "independent variable", practice: true,
      q: "In the review study asking whether D3 versus D4 clinic grades are associated with later outcomes, which variable is functioning as the predictor?",
      a: "D3 versus D4 clinic-grade status",
      d: ["Patient satisfaction", "Residency acceptance", "Annual earnings after graduation"],
      e: "The D3/D4 grouping is used to explain or predict the three later outcomes, so it is the independent variable."
    },
    {
      k: "application", p: "5", o: "dependent variables", practice: true,
      q: "Which list contains only outcomes from the D3/D4 review scenario?",
      a: "Patient satisfaction, residency acceptance, and yearly earnings",
      d: ["D3/D4 status, clinic year, and school name", "Patient satisfaction, D3/D4 status, and sample size", "Residency acceptance, confidence level, and D3/D4 status"],
      e: "Those three measures are the dependent variables whose association with clinic grade is being studied."
    },
    {
      k: "application", p: "5", o: "operationalizing satisfaction", practice: true,
      q: "Which plan best operationalizes patient satisfaction?",
      a: "Administer a named 10-item satisfaction scale after care and use its total score.",
      d: ["Define satisfaction as a patient's positive feeling.", "Ask the clinician whether the patient appeared happy.", "Assume that every patient who returns is satisfied."],
      e: "The named instrument, timing, and scoring rule make the construct observable and reproducible."
    },
    {
      k: "application", p: "5", o: "confounding", practice: true,
      q: "Suppose D4 students treat more complex cases than D3 students. Why should case complexity be considered?",
      a: "It could influence both clinic grades and patient satisfaction, creating a confounded association.",
      d: ["It automatically becomes the study's dependent variable.", "It changes patient satisfaction from ordinal to nominal.", "It proves that D4 grades cause satisfaction."],
      e: "A confounder offers an alternative explanation for an observed predictor-outcome relationship."
    },
    {
      k: "application", p: "5", o: "association versus causation", practice: true,
      q: "The D3/D4 study finds that higher clinic grades are associated with residency acceptance. Which conclusion is justified from association alone?",
      a: "Clinic grade and acceptance are related in the observed data, but causation is not established.",
      d: ["Improving a clinic grade will necessarily cause residency acceptance.", "Residency acceptance must have caused the earlier clinic grade.", "The relationship cannot be affected by any third variable."],
      e: "An association establishes covariation, not temporal control or the absence of alternative explanations."
    },
    {
      k: "application", p: "5", o: "direction of prediction", practice: true,
      q: "A second study asks whether residency acceptance predicts first-year earnings. In that new question, residency acceptance is the:",
      a: "Independent variable",
      d: ["Dependent variable", "Measurement error", "Population parameter"],
      e: "Here residency acceptance is the proposed predictor and earnings is the outcome, showing that roles depend on the question."
    }
  ]);

  section(T.measurement, [
    {
      k: "theory", p: "5-6", o: "measurement hierarchy",
      q: "What property is added when moving from nominal to ordinal measurement?",
      a: "A meaningful order among categories",
      d: ["Equal distances between values", "An absolute zero", "Continuous measurement"],
      e: "Nominal data name categories. Ordinal data retain categories and add rank order, but spacing is not known to be equal."
    },
    {
      k: "theory", p: "6", o: "interval scale",
      q: "What distinguishes an interval scale from an ordinal scale?",
      a: "Adjacent numerical intervals represent equal amounts of change.",
      d: ["The categories have no order.", "The scale must have a true zero.", "The data must be qualitative."],
      e: "Interval measurement adds equal spacing. A meaningful absolute zero is the extra property of ratio measurement."
    },
    {
      k: "theory", p: "6", o: "ratio scale",
      q: "Why can a ratio-level value support a statement such as 'twice as much'?",
      a: "It has equal units and an absolute zero.",
      d: ["Its categories are merely named.", "Its zero is arbitrary.", "It has order but unequal spacing."],
      e: "An absolute zero makes ratios meaningful; 20 seconds is twice 10 seconds."
    },
    {
      k: "theory", p: "3", o: "qualitative versus quantitative",
      q: "Which statement correctly contrasts qualitative and quantitative variables?",
      a: "Qualitative variables place observations into categories; quantitative variables express numerical amount.",
      d: ["Qualitative variables are always ordinal; quantitative variables are always ratio.", "Qualitative data cannot be analyzed statistically.", "Quantitative variables never use categories."],
      e: "Qualitative or quantitative describes the kind of information. Measurement level is related but separate."
    },
    {
      k: "theory", p: "5-6", o: "numeric labels",
      q: "A researcher codes manual toothbrush = 1 and powered toothbrush = 2. Why is the resulting variable still nominal?",
      a: "The numbers are labels and do not represent amount or rank.",
      d: ["Any variable with two categories is ratio.", "The difference between 1 and 2 is an equal interval.", "A code of 1 creates an absolute zero."],
      e: "Numerical coding does not change the information contained in unordered categories."
    },
    {
      k: "application", p: "5", o: "nominal oral-hygiene measure", practice: true,
      q: "Which oral-hygiene behavior measure is nominal?",
      a: "Usual cleaning method: manual brush, powered brush, or interdental brush",
      d: ["Self-rated hygiene: poor, fair, good, excellent", "Minutes spent brushing each day", "Number of brushing sessions per day"],
      e: "Cleaning method consists of unordered names or categories."
    },
    {
      k: "application", p: "5", o: "ordinal oral-hygiene measure", practice: true,
      q: "Which oral-hygiene behavior measure is ordinal?",
      a: "Adherence rated as never, sometimes, usually, or always",
      d: ["Brand of toothpaste used", "Total brushing seconds recorded by a timer", "Number of days brushed during a seven-day period"],
      e: "The response categories have a clear order, but adjacent distances are not known to be equal."
    },
    {
      k: "application", p: "5", o: "ratio oral-hygiene measure", practice: true,
      q: "Which oral-hygiene behavior measure has the clearest ratio interpretation?",
      a: "Total seconds of brushing observed during one day",
      d: ["Toothbrush color", "Poor/fair/good adherence", "A satisfaction rating from 1 to 5"],
      e: "Elapsed time has equal units and a meaningful zero; 120 seconds is twice 60 seconds."
    },
    {
      k: "application", p: "5", o: "dichotomous nominal outcome", practice: true,
      q: "Residency acceptance recorded as accepted or not accepted is best classified as:",
      a: "Dichotomous nominal",
      d: ["Continuous ratio", "Ordinal with many ranks", "Interval with an arbitrary zero"],
      e: "There are two named categories without a measured distance between them."
    },
    {
      k: "application", p: "5", o: "ratio outcome", practice: true,
      q: "Annual earnings recorded to the nearest dollar are generally treated as:",
      a: "Quantitative ratio data",
      d: ["Qualitative nominal data", "Ordinal categories", "Interval data with no meaningful zero"],
      e: "Dollar units are equally spaced, and zero represents absence of earnings for the measured period."
    },
    {
      k: "application", p: "5", o: "ordinal satisfaction outcome", practice: true,
      q: "A patient-satisfaction item uses 1 = very dissatisfied through 5 = very satisfied. What is the safest level classification?",
      a: "Ordinal",
      d: ["Nominal", "Ratio", "Continuous interval by definition"],
      e: "The options are ordered, but equal psychological distance between successive categories is not guaranteed."
    },
    {
      k: "application", p: "5-6", o: "highest supported level", practice: true,
      q: "A student reports brushing 0, 1, 2, or 3 times yesterday. At the level recorded, this variable is:",
      a: "Discrete ratio",
      d: ["Continuous interval", "Ordinal only", "Nominal"],
      e: "The values are counts with equal units and a true zero; only whole sessions are recorded."
    }
  ]);

  section(T.center, [
    {
      k: "theory", p: "3, 7", o: "mean",
      q: "Why is the mean especially sensitive to an unusually large score?",
      a: "Every score contributes its magnitude to the total used in the mean.",
      d: ["The mean uses only the middle observation.", "The mean is the most frequent category.", "The mean ignores the distance between scores."],
      e: "Because the mean is the sum divided by n, an extreme value can pull it toward the tail."
    },
    {
      k: "theory", p: "3, 7", o: "median",
      q: "Which feature makes the median useful for a skewed distribution?",
      a: "Its position depends on rank, so extreme magnitudes have limited influence.",
      d: ["It must equal the mode.", "It uses every deviation from the mean.", "It can only be used for nominal data."],
      e: "Once observations are ordered, the middle position is resistant to very high or low values."
    },
    {
      k: "theory", p: "3, 7", o: "mode",
      q: "Which measure of central tendency answers 'What score occurs most often?'",
      a: "Mode",
      d: ["Mean", "Median", "Interquartile range"],
      e: "The mode is the most frequently observed value or category."
    },
    {
      k: "calculation", p: "7", o: "review-data mean", practice: true,
      q: "For the review scores 3, 7, 5, 9, 7, 5, 5, 12, 9, and 4, which calculation gives the mean?",
      a: "66 / 10 = 6.6",
      d: ["60 / 10 = 6.0", "66 / 9 = 7.33", "61 / 10 = 6.1"],
      e: "The ten values sum to 66, so x-bar = 66 divided by 10 = 6.6."
    },
    {
      k: "calculation", p: "7-8", o: "review-data median", practice: true,
      q: "After ordering the review scores, which two positions determine the median?",
      a: "The 5th value (5) and 6th value (7), giving a median of 6",
      d: ["The 4th and 5th values, giving 5", "The 5th value alone, giving 5", "The 6th and 7th values, giving 7"],
      e: "With n = 10, the median is the average of positions 5 and 6: (5 + 7) / 2 = 6."
    },
    {
      k: "calculation", p: "7", o: "review-data mode", practice: true,
      q: "Which frequency statement correctly identifies the mode of the review data?",
      a: "The value 5 occurs three times, so the mode is 5.",
      d: ["The value 7 occurs three times, so the mode is 7.", "The value 9 occurs three times, so the mode is 9.", "No value repeats, so there is no mode."],
      e: "Five appears three times; seven and nine each appear twice."
    },
    {
      k: "calculation", p: "7", o: "effect of an extreme value", practice: true,
      q: "If the score 12 in the review data were replaced by 22, what would the new mean be?",
      a: "7.6",
      d: ["6.6", "7.0", "8.6"],
      e: "Replacing 12 with 22 adds 10 to the original total: 76 / 10 = 7.6."
    },
    {
      k: "calculation", p: "7", o: "mean after removing a value", practice: true,
      q: "If the lowest score, 3, is removed from the review data, what is the mean of the remaining nine scores?",
      a: "7.0",
      d: ["6.3", "6.6", "7.33"],
      e: "The new total is 66 - 3 = 63, and 63 / 9 = 7."
    },
    {
      k: "application", p: "7", o: "choosing a center", practice: true,
      q: "One graduate in an earnings study makes several million dollars while all others earn typical salaries. Which center best represents a typical graduate?",
      a: "Median",
      d: ["Mean", "Range", "Standard deviation"],
      e: "The extreme high income would pull the mean upward; the median is more resistant."
    },
    {
      k: "calculation", p: "7-8", o: "integrated central tendency", practice: true,
      q: "Which ordered triple correctly reports mean, median, and mode for the review data?",
      a: "6.6, 6, 5",
      d: ["6, 6.6, 5", "6.6, 5, 6", "5, 6, 6.6"],
      e: "The sum-based mean is 6.6, the middle-pair average is 6, and the most frequent value is 5."
    }
  ]);

  section(T.distribution, [
    {
      k: "theory", p: "3, 7-8", o: "IQR meaning",
      q: "What portion of an ordered distribution is contained inside the box of a standard box-and-whisker plot?",
      a: "The middle 50% from Q1 to Q3",
      d: ["All observations from minimum to maximum", "The middle 95% around the mean", "Only observations equal to the median"],
      e: "The box spans the first to third quartile; its width is the interquartile range."
    },
    {
      k: "theory", p: "7-8", o: "outlier rule",
      q: "Under the 1.5-IQR rule, when is a score flagged as a potential outlier?",
      a: "When it lies below Q1 - 1.5(IQR) or above Q3 + 1.5(IQR)",
      d: ["Whenever it differs from the mean", "Whenever it is the minimum or maximum", "Only when it is more than one SD above the mean"],
      e: "The lower and upper fences define the values beyond which observations are flagged."
    },
    {
      k: "theory", p: "7-8", o: "skew",
      q: "Which feature determines whether a distribution is described as right- or left-skewed?",
      a: "The direction of its longer tail",
      d: ["The sign of every score", "Whether the mode is an even number", "The number of observations"],
      e: "A right-skewed distribution has a longer high-value tail; a left-skewed distribution has a longer low-value tail."
    },
    {
      k: "calculation", p: "8", o: "five-number summary", practice: true,
      q: "For 3, 4, 5, 5, 5, 7, 7, 9, 9, 12, which five-number summary uses the median-of-halves method?",
      a: "Min 3, Q1 5, median 6, Q3 9, max 12",
      d: ["Min 3, Q1 4, median 5, Q3 9, max 12", "Min 3, Q1 5, median 7, Q3 9, max 12", "Min 4, Q1 5, median 6, Q3 7, max 9"],
      e: "The lower-half median is 5, the two middle values average to 6, and the upper-half median is 9."
    },
    {
      k: "calculation", p: "8", o: "range", practice: true,
      q: "What is the range of the review data shown on the box-plot slide?",
      a: "9",
      d: ["4", "6", "12"],
      e: "Range = maximum - minimum = 12 - 3 = 9."
    },
    {
      k: "calculation", p: "8", o: "quartiles", practice: true,
      q: "Using the review's ordered data, what are Q1 and Q3?",
      a: "Q1 = 5 and Q3 = 9",
      d: ["Q1 = 3 and Q3 = 12", "Q1 = 4 and Q3 = 9", "Q1 = 5 and Q3 = 7"],
      e: "The median of 3,4,5,5,5 is 5; the median of 7,7,9,9,12 is 9."
    },
    {
      k: "calculation", p: "8", o: "IQR", practice: true,
      q: "What interquartile range follows from Q1 = 5 and Q3 = 9?",
      a: "4",
      d: ["-4", "5", "14"],
      e: "IQR = Q3 - Q1 = 9 - 5 = 4."
    },
    {
      k: "calculation", p: "8", o: "outlier fences", practice: true,
      q: "For Q1 = 5 and IQR = 4, which pair gives the lower and upper outlier fences?",
      a: "-1 and 15",
      d: ["1 and 13", "-6 and 19", "5 and 9"],
      e: "1.5(IQR) = 6. Lower fence = 5 - 6 = -1; upper fence = 9 + 6 = 15."
    },
    {
      k: "calculation", p: "8", o: "outlier decision", practice: true,
      q: "Using fences of -1 and 15, how should the values 3 and 12 in the review data be treated?",
      a: "Neither is an outlier.",
      d: ["Both are outliers.", "Only 3 is an outlier.", "Only 12 is an outlier."],
      e: "Both observations fall within the allowable interval from -1 through 15."
    },
    {
      k: "calculation", p: "7-8", o: "changed-data outlier", practice: true,
      q: "If a new score of 20 is added while Q1 = 5 and Q3 = 9 remain the quartiles, what is the correct outlier decision?",
      a: "20 is an upper outlier because it exceeds the fence of 15.",
      d: ["20 is not an outlier because it is below twice the median.", "20 is a lower outlier.", "Every value above Q3 is automatically an outlier."],
      e: "The upper fence is 9 + 1.5(4) = 15, and 20 is above it."
    },
    {
      k: "application", p: "7-8", o: "shape of review data", practice: true,
      q: "For the review data, mean = 6.6, median = 6, mode = 5, and the largest value is 12. Which shape is most consistent?",
      a: "A modest right (positive) skew",
      d: ["A strong left (negative) skew", "Perfect symmetry", "A distribution with no variability"],
      e: "For right skew, the high-value tail pulls the mean above the median, and the median above the mode."
    }
  ]);

  section(T.spread, [
    {
      k: "theory", p: "3, 9", o: "standard deviation meaning",
      q: "The review states that SD = 2.6 for the ten scores. What is the best plain-language interpretation?",
      a: "Scores typically lie about 2.6 units from the mean of 6.6.",
      d: ["Every score is exactly 2.6.", "The mean is wrong by 2.6.", "The middle 50% has a width of 2.6."],
      e: "Standard deviation describes typical spread around the mean; it is not a fixed distance for every observation."
    },
    {
      k: "theory", p: "3, 9", o: "comparing spread",
      q: "Two samples have the same mean, but Sample A has SD = 2 and Sample B has SD = 7. Which statement is correct?",
      a: "Sample B's scores are more dispersed around the shared mean.",
      d: ["Sample B necessarily has a larger sample size.", "Sample A has more outliers by definition.", "The two distributions must have identical shapes."],
      e: "With a common center and units, the larger SD indicates greater spread."
    },
    {
      k: "theory", p: "3", o: "sample versus population notation",
      q: "Why does a confidence interval use sample information?",
      a: "The population parameter is unknown, so a sample statistic and its uncertainty are used to estimate it.",
      d: ["A population can never contain quantitative variables.", "A sample mean is always identical to the population mean.", "Confidence intervals describe only the observed minimum and maximum."],
      e: "Inference begins with a sample estimate and quantifies how much that estimate would vary across samples."
    },
    {
      k: "theory", p: "3, 9", o: "standard error",
      q: "What does SD / square root of n represent in the review's confidence-interval formula?",
      a: "The standard error of the sample mean",
      d: ["The interquartile range", "The population mean", "The Type I error rate"],
      e: "Standard error estimates how much sample means vary from sample to sample."
    },
    {
      k: "theory", p: "3, 9", o: "confidence-interval interpretation",
      q: "Which interpretation of a 95% confidence-interval method is most accurate?",
      a: "Across repeated samples, about 95% of intervals built this way would contain the true population mean.",
      d: ["Exactly 95% of individual scores lie inside every interval.", "There is a 95% chance that the sample mean is correct.", "The interval contains 95% of the population observations."],
      e: "The confidence level describes the long-run performance of the interval-producing procedure."
    },
    {
      k: "application", p: "3, 9", o: "sample size and precision",
      q: "A second implant study keeps the same mean and SD but increases n from 25 to 100. What happens to its confidence interval?",
      a: "It becomes narrower because the standard error is cut in half.",
      d: ["It becomes twice as wide.", "It stays the same because the mean did not change.", "It shifts to zero."],
      e: "SE is proportional to 1/square root of n; quadrupling n halves SE and the margin of error."
    },
    {
      k: "application", p: "3, 9", o: "variability and precision",
      q: "Holding sample size and confidence level fixed, what happens when SD increases?",
      a: "The interval widens because the estimate is less precise.",
      d: ["The interval narrows.", "Only the midpoint changes.", "The confidence level automatically drops to 50%."],
      e: "Greater variability increases standard error and therefore the margin of error."
    },
    {
      k: "application", p: "3, 9", o: "confidence level and width",
      q: "Holding the data fixed, why is a 99% confidence interval wider than a 95% interval?",
      a: "Greater confidence requires a larger critical value and margin of error.",
      d: ["The sample mean becomes larger.", "The standard deviation becomes zero.", "The sample size is automatically reduced."],
      e: "Capturing the parameter more often requires extending the interval farther from the estimate."
    },
    {
      k: "calculation", p: "9", o: "review-data standard error", practice: true,
      q: "For SD = 2.6 and n = 10, what is the approximate standard error used for the review confidence interval?",
      a: "0.82",
      d: ["0.26", "1.64", "2.60"],
      e: "SE = 2.6 / square root of 10 = 2.6 / 3.162, which is approximately 0.82."
    },
    {
      k: "calculation", p: "9", o: "review-data 95% confidence interval", practice: true,
      q: "Using x-bar = 6.6, SD = 2.6, n = 10, and z* = 1.96, which is the approximate 95% confidence interval?",
      a: "4.99 to 8.21",
      d: ["4.00 to 9.20", "5.78 to 7.42", "1.50 to 11.70"],
      e: "SE is about 0.82; margin = 1.96(0.82) about 1.61; 6.6 +/- 1.61 gives 4.99 to 8.21."
    }
  ]);

  section(T.zci, [
    {
      k: "theory", p: "3, 9", o: "z-score meaning",
      q: "What information does a z-score preserve that a raw score alone does not?",
      a: "The score's direction and distance from the mean in standard-deviation units",
      d: ["The sample size and confidence level", "The median and interquartile range", "Whether the variable is nominal"],
      e: "Standardization expresses relative location, allowing positions on different scales to be compared."
    },
    {
      k: "theory", p: "9", o: "z-score sign",
      q: "What does a negative z-score indicate?",
      a: "The raw score is below the mean.",
      d: ["The standard deviation is negative.", "The raw score is automatically an outlier.", "The sample mean is below zero."],
      e: "The numerator x - mean is negative whenever x is below the mean."
    },
    {
      k: "theory", p: "3, 9", o: "percentile meaning",
      q: "A score at the 90th percentile is best interpreted as:",
      a: "About 90% of the reference distribution is at or below that score.",
      d: ["The score is 90% correct.", "The score is 90 standard deviations above the mean.", "Exactly 10 people scored higher."],
      e: "A percentile is a cumulative relative position, not a percent-correct score."
    },
    {
      k: "calculation", p: "9", o: "z-score for x = 1", practice: true,
      q: "With mean 6.6 and SD 2.6, what z-score corresponds to a raw score of 1?",
      a: "Approximately -2.15",
      d: ["Approximately -0.85", "Approximately 1.31", "Approximately 2.54"],
      e: "z = (1 - 6.6) / 2.6 = -5.6 / 2.6, which is about -2.15."
    },
    {
      k: "calculation", p: "9", o: "z-score for x = 10", practice: true,
      q: "With mean 6.6 and SD 2.6, what z-score corresponds to a raw score of 10?",
      a: "Approximately 1.31",
      d: ["Approximately -1.31", "Approximately 0.38", "Approximately 3.40"],
      e: "z = (10 - 6.6) / 2.6 = 3.4 / 2.6, which is about 1.31."
    },
    {
      k: "calculation", p: "9", o: "raw score from z", practice: true,
      q: "Which calculation correctly reverses z = -0.85 when mean = 6.6 and SD = 2.6?",
      a: "x = 6.6 + (-0.85)(2.6) = 4.39",
      d: ["x = 6.6 - (-0.85)(2.6) = 8.81", "x = -0.85 + 6.6 / 2.6 = 1.69", "x = (6.6 - 2.6) / -0.85 = -4.71"],
      e: "Rearrange z = (x - mean) / SD to x = mean + z(SD)."
    },
    {
      k: "calculation", p: "9", o: "percentile for z = -2.15", practice: true,
      q: "A z-score of -2.15 is closest to which percentile?",
      a: "1.6th percentile",
      d: ["15th percentile", "50th percentile", "98.4th percentile"],
      e: "The cumulative normal area below z = -2.15 is approximately 0.0158."
    },
    {
      k: "calculation", p: "9", o: "percentile for z = 1.31", practice: true,
      q: "A z-score of 1.31 is closest to which percentile?",
      a: "90.5th percentile",
      d: ["9.5th percentile", "31st percentile", "99.5th percentile"],
      e: "The cumulative normal area below z = 1.31 is approximately 0.9049."
    },
    {
      k: "calculation", p: "9", o: "percentile for z = -0.85", practice: true,
      q: "A z-score of -0.85 is closest to which percentile?",
      a: "19.8th percentile",
      d: ["8.5th percentile", "50th percentile", "80.2nd percentile"],
      e: "The cumulative normal area below z = -0.85 is approximately 0.1977."
    },
    {
      k: "calculation", p: "9", o: "z = 0", practice: true,
      q: "For the review distribution, which raw score has z = 0?",
      a: "6.6",
      d: ["0", "2.6", "9.2"],
      e: "A z-score of zero occurs at the mean, which is 6.6."
    },
    {
      k: "calculation", p: "9", o: "one SD above mean", practice: true,
      q: "For mean = 6.6 and SD = 2.6, what raw score is exactly one SD above the mean?",
      a: "9.2",
      d: ["4.0", "6.6", "10.2"],
      e: "x = mean + 1(SD) = 6.6 + 2.6 = 9.2."
    },
    {
      k: "application", p: "3, 9", o: "standardized comparison",
      q: "Student A scores 84 on an exam with mean 80 and SD 2. Student B scores 92 on an exam with mean 80 and SD 8. Who performed better relative to classmates?",
      a: "Student A, because z = 2 versus Student B's z = 1.5",
      d: ["Student B, because 92 is the larger raw score", "They performed identically because both means are 80", "The comparison is impossible even with z-scores"],
      e: "Standardizing accounts for each exam's spread: (84 - 80)/2 = 2 and (92 - 80)/8 = 1.5."
    }
  ]);

  section(T.questions, [
    {
      k: "theory", p: "3, 10", o: "research hypothesis",
      q: "What should a research hypothesis state?",
      a: "A testable expected relationship or difference between defined variables",
      d: ["That no population relationship exists", "Only the names of study participants", "The numerical results after analysis"],
      e: "A useful hypothesis connects measurable variables and is stated before the outcome is known."
    },
    {
      k: "theory", p: "3, 10", o: "null hypothesis",
      q: "What is the logical role of the null hypothesis?",
      a: "It represents no population effect, difference, or association for statistical testing.",
      d: ["It states the researcher's desired conclusion.", "It proves that groups are identical.", "It identifies the outcome's measurement scale."],
      e: "Evidence is evaluated against the null; failing to reject it is not proof that it is true."
    },
    {
      k: "theory", p: "3", o: "directional hypothesis",
      q: "Which wording makes a hypothesis directional?",
      a: "It predicts which group will have the higher or lower outcome.",
      d: ["It uses the word significant.", "It includes a sample size.", "It states only that groups may differ."],
      e: "Direction specifies the expected sign of the result, such as longer rather than merely different."
    },
    {
      k: "theory", p: "3", o: "one- versus two-tailed",
      q: "A hypothesis predicts that a new procedure will change implant survival but does not specify longer or shorter. The matching test is:",
      a: "Two-tailed",
      d: ["One-tailed in the positive direction", "One-tailed in the negative direction", "Not testable under any tail choice"],
      e: "A nondirectional alternative allocates rejection regions to both directions."
    },
    {
      k: "theory", p: "11", o: "PICO structure",
      q: "Which PICO component identifies what the intervention is evaluated against?",
      a: "Comparison",
      d: ["Population", "Intervention", "Outcome"],
      e: "C specifies the alternative, control, usual care, or other reference condition."
    },
    {
      k: "application", p: "10", o: "directional implant hypothesis", practice: true,
      q: "Which is the strongest research hypothesis for the review's implant scenario?",
      a: "Adults receiving the new implant procedure will have longer implant survival than adults receiving the standard procedure.",
      d: ["Implants are used in adults.", "There will be no difference in survival between procedures.", "The new procedure and survival are interesting topics."],
      e: "This statement defines both groups, a measurable outcome, and the predicted direction."
    },
    {
      k: "application", p: "10", o: "implant null hypothesis", practice: true,
      q: "Which null hypothesis matches the directional implant hypothesis?",
      a: "Population implant-survival time does not differ between the new and standard procedures.",
      d: ["The new procedure has longer survival.", "The standard procedure has longer survival.", "Every implant will survive for the same length of time."],
      e: "The statistical null states no population difference, not that every individual outcome is identical."
    },
    {
      k: "application", p: "10-11", o: "PICO population", practice: true,
      q: "In 'Among adults receiving a first dental implant, does procedure N versus the standard procedure improve five-year survival?', what is P?",
      a: "Adults receiving a first dental implant",
      d: ["Procedure N", "The standard procedure", "Five-year implant survival"],
      e: "P identifies the patients or problem to which the clinical question applies."
    },
    {
      k: "application", p: "10-11", o: "PICO intervention and comparison", practice: true,
      q: "In the same implant question, which pairing correctly identifies I and C?",
      a: "I = procedure N; C = the standard procedure",
      d: ["I = adults; C = five-year survival", "I = five-year survival; C = adults", "I = standard procedure; C = implant failure only"],
      e: "The intervention is the new procedure and the comparison is standard care."
    },
    {
      k: "application", p: "10-11", o: "PICO outcome", practice: true,
      q: "Which outcome makes the implant PICO question most testable?",
      a: "Proportion of implants still functioning at five years",
      d: ["Whether the procedure seems modern", "Whether patients like dentistry", "The researcher's confidence in the procedure"],
      e: "A defined time point and observable functioning criterion create a measurable outcome."
    },
    {
      k: "application", p: "10-11", o: "complete PICO question", practice: true,
      q: "Which option is a complete PICO question rather than a general topic?",
      a: "In adults needing one implant, does procedure N, compared with standard placement, increase five-year implant survival?",
      d: ["Why do dental implants fail?", "Are new implant procedures useful?", "What is the history of implant placement?"],
      e: "The question explicitly includes population, intervention, comparison, and outcome."
    },
    {
      k: "application", p: "10-11", o: "operational outcome", practice: true,
      q: "Which operational definition of 'implant lasts longer' is clearest?",
      a: "Months from placement until removal, loss, or documented mechanical failure",
      d: ["The implant appears successful.", "The patient believes it lasted a long time.", "The clinician prefers the new procedure."],
      e: "A start point, end point, and unit of time make longevity reproducible and analyzable."
    }
  ]);

  section(T.errors, [
    {
      k: "theory", p: "10, 12", o: "Type I error",
      q: "Which cell of the review's 2-by-2 decision table is a Type I error?",
      a: "Reject the null when the null is actually true",
      d: ["Reject the null when it is false", "Fail to reject the null when it is true", "Fail to reject the null when it is false"],
      e: "A Type I error is a false positive: declaring an effect when reality contains no effect."
    },
    {
      k: "theory", p: "10, 12", o: "Type II error",
      q: "Which cell of the decision table is a Type II error?",
      a: "Fail to reject the null when the null is actually false",
      d: ["Reject the null when it is true", "Reject the null when it is false", "Fail to reject the null when it is true"],
      e: "A Type II error is a false negative: missing a real effect."
    },
    {
      k: "theory", p: "12", o: "correct rejection",
      q: "When the null is false and the researcher rejects it, the decision is:",
      a: "Correct detection of a real effect",
      d: ["A Type I error", "A Type II error", "Proof that the effect is clinically large"],
      e: "This is the successful-detection cell of the table and is related to statistical power."
    },
    {
      k: "theory", p: "12", o: "correct non-rejection",
      q: "When the null is true and the researcher fails to reject it, the decision is:",
      a: "A correct failure to detect an effect that is not present",
      d: ["A Type I error", "A Type II error", "A false positive"],
      e: "The conclusion and reality agree: no population effect is present and none is declared."
    },
    {
      k: "theory", p: "3, 12", o: "alpha",
      q: "Alpha is the researcher's tolerated probability of which error?",
      a: "Type I error",
      d: ["Type II error", "Measurement error", "Sampling every member of the population"],
      e: "Alpha controls the false-positive rejection threshold when the null is true."
    },
    {
      k: "theory", p: "12", o: "beta and power",
      q: "Which relationship between beta and power is correct?",
      a: "Power = 1 - beta",
      d: ["Power = 1 - alpha", "Beta = 1 + power", "Power = alpha / beta"],
      e: "Beta is the probability of missing a real effect; power is the probability of detecting it."
    },
    {
      k: "theory", p: "3, 12", o: "failure to reject",
      q: "Why is 'fail to reject the null' preferable to 'prove the null'?",
      a: "A nonsignificant result may reflect limited power rather than true equality.",
      d: ["The null can never be written mathematically.", "A sample always proves the alternative.", "Failure to reject means a Type I error occurred."],
      e: "Insufficient evidence against the null is not evidence that the null has been established as true."
    },
    {
      k: "application", p: "10, 12", o: "implant Type I error", practice: true,
      q: "The new implant procedure truly has the same survival as standard care, but the study concludes it lasts longer. What happened?",
      a: "Type I error",
      d: ["Type II error", "Correct rejection of a false null", "Correct failure to reject a true null"],
      e: "The null of no difference was true, yet it was rejected."
    },
    {
      k: "application", p: "10, 12", o: "implant Type II error", practice: true,
      q: "The new implant procedure truly improves survival, but the study reports no statistically detectable improvement. What happened?",
      a: "Type II error",
      d: ["Type I error", "Correct rejection", "An absolute-zero error"],
      e: "A real difference existed, but the study failed to reject the false null."
    },
    {
      k: "application", p: "12", o: "power and sample size", practice: true,
      q: "An underpowered pilot misses a real implant benefit. Which redesign most directly reduces the chance of repeating that error?",
      a: "Increase sample size while preserving a sound design and reliable outcome measure.",
      d: ["Use fewer participants.", "Make the survival measure less reliable.", "Choose the hypothesis direction after seeing the results."],
      e: "A larger sample and reliable measurement increase power and reduce Type II error risk."
    },
    {
      k: "application", p: "3, 10", o: "tail choice", practice: true,
      q: "The team would consider either longer or shorter implant survival important. Which alternative and tail choice fit that goal?",
      a: "A nondirectional alternative with a two-tailed test",
      d: ["A directional longer-only alternative with a one-tailed test", "A null hypothesis with no statistical test", "A shorter-only alternative chosen after analysis"],
      e: "When meaningful departures in both directions matter, alpha is allocated to both tails."
    },
    {
      k: "application", p: "12", o: "clinical false-positive consequence", practice: true,
      q: "Which consequence best illustrates why a Type I error can matter clinically?",
      a: "Adopting a costlier implant method that has no real survival advantage",
      d: ["Failing to adopt a genuinely superior method", "Obtaining the correct conclusion when the null is true", "Increasing precision with a larger sample"],
      e: "A false positive can lead clinicians to adopt an ineffective intervention; missing a real benefit is the Type II counterpart."
    }
  ]);

  section(T.reliability, [
    {
      k: "theory", p: "13", o: "reliability",
      q: "What is the core question asked by measurement reliability?",
      a: "Would the measurement be reasonably consistent if repeated under comparable conditions?",
      d: ["Does the study generalize to every population?", "Does the measure capture the intended construct perfectly?", "Is the null hypothesis false?"],
      e: "Reliability concerns consistency and the amount of random measurement error."
    },
    {
      k: "theory", p: "13", o: "classical measurement model",
      q: "In the review's measurement model, an observed score is composed of:",
      a: "True score plus measurement error",
      d: ["Population mean plus sample size", "Validity plus reliability", "Median plus interquartile range"],
      e: "The observed result reflects the underlying value and error introduced by people, instruments, occasions, or conditions."
    },
    {
      k: "theory", p: "13", o: "true score",
      q: "Why can a true score not be observed with certainty?",
      a: "Every actual observation contains some measurement error.",
      d: ["True scores exist only for nominal variables.", "A true score is always equal to zero.", "Reliability requires two different populations."],
      e: "The true score is a theoretical error-free value inferred from repeated observations, not directly captured."
    },
    {
      k: "theory", p: "13", o: "selecting reliability evidence",
      q: "What should determine the method used to establish reliability?",
      a: "The likely source of error and the way the variable is measured",
      d: ["The researcher's preferred result", "Whether the mean is larger than the median", "The alpha level alone"],
      e: "Repeated occasions, different raters, and multi-item instruments create different consistency questions."
    },
    {
      k: "application", p: "14", o: "inter-examiner reliability", practice: true,
      q: "Two trained examiners independently score plaque on the same patients. Which evidence is being evaluated?",
      a: "Inter-rater reliability",
      d: ["Test-retest reliability", "External validity", "Predictive validity"],
      e: "Agreement across different examiners addresses whether scorer identity changes the result."
    },
    {
      k: "application", p: "14", o: "intra-examiner reliability", practice: true,
      q: "One examiner re-scores the same plaque photographs two weeks later without seeing the original ratings. This evaluates:",
      a: "Intra-rater reliability",
      d: ["Inter-rater reliability", "Content validity", "Population generalizability"],
      e: "The same examiner's consistency across occasions is intra-rater reliability."
    },
    {
      k: "application", p: "14", o: "examiner correlations", practice: true,
      q: "The review reports intra- and inter-examiner r-squared values of 0.91 and 0.86. What is the most defensible conclusion?",
      a: "The scoring procedure shows strong, though not perfect, examiner consistency.",
      d: ["The plaque index is proven perfectly valid.", "There is no measurement error.", "The intervention must have caused the outcome."],
      e: "High agreement supports reliability, but it does not by itself establish validity or causation."
    },
    {
      k: "application", p: "14", o: "standardized conditions", practice: true,
      q: "Giving every student the same toothbrush and toothpaste primarily improves the study by:",
      a: "Supporting measurement reliability through standardized materials and administration",
      d: ["Guaranteeing that the sample represents all children", "Eliminating the need to train examiners", "Turning plaque scores into ratio data"],
      e: "Standardization reduces error caused by different toothbrushes, toothpastes, or instructions, making observations more consistent."
    },
    {
      k: "application", p: "13-14", o: "reliability versus validity", practice: true,
      q: "A plaque instrument gives nearly identical scores every time but systematically scores all patients too high. It is:",
      a: "Reliable but not valid",
      d: ["Valid but not reliable", "Both perfectly reliable and valid", "Neither measurable nor quantitative"],
      e: "Consistency can coexist with systematic inaccuracy; reliability is necessary but not sufficient for validity."
    }
  ]);

  section(T.validity, [
    {
      k: "theory", p: "13", o: "measurement validity",
      q: "What question is answered by measurement validity?",
      a: "Does the procedure measure the construct it is intended to measure?",
      d: ["Will two raters always agree?", "Can the result be generalized to every setting?", "Is the sample mean equal to the population mean?"],
      e: "Validity concerns the accuracy and defensibility of the interpretation made from scores."
    },
    {
      k: "theory", p: "13", o: "validity evidence",
      q: "Why is validity usually described as supported by evidence rather than permanently proven?",
      a: "Validity depends on the use, population, and interpretation of the scores.",
      d: ["A valid instrument cannot contain numbers.", "Validity is identical to sample size.", "Only unreliable instruments need evidence."],
      e: "Evidence can strengthen or weaken a proposed interpretation in a particular context."
    },
    {
      k: "theory", p: "13", o: "reliability and validity",
      q: "Which relationship between reliability and validity is most accurate?",
      a: "A measure generally needs adequate reliability to support validity, but reliability alone is insufficient.",
      d: ["Any reliable measure is automatically valid.", "Validity guarantees perfect reliability.", "Reliability and validity are unrelated."],
      e: "Large random error undermines accuracy, but a consistent measure can still target the wrong construct."
    },
    {
      k: "theory", p: "13", o: "measurement versus study validity",
      q: "Which statement distinguishes measurement validity from study validity?",
      a: "Measurement validity concerns score interpretation; study validity concerns conclusions drawn from the overall design.",
      d: ["Measurement validity is external only; study validity is internal only.", "Measurement validity applies to samples; study validity applies only to populations.", "The two terms are interchangeable."],
      e: "A sound study needs defensible measures and a design that supports causal and generalizable conclusions."
    },
    {
      k: "application", p: "14", o: "plaque-index validity", practice: true,
      q: "Why does using a recognized plaque index strengthen the measurement argument in the toothbrushing study?",
      a: "It links the observed scoring procedure to the intended construct of plaque accumulation.",
      d: ["It guarantees that examiners are blinded.", "It eliminates attrition.", "It proves the intervention works."],
      e: "A defined plaque index provides an established operational link between observations and the construct being measured."
    },
    {
      k: "application", p: "5, 13", o: "valid satisfaction measure", practice: true,
      q: "Which choice gives the strongest evidence that a patient-satisfaction score is valid for the D3/D4 study?",
      a: "Its scores behave as expected and correspond with other credible satisfaction indicators in similar patients.",
      d: ["The questionnaire always prints the same total.", "The survey contains many items regardless of content.", "The investigator personally likes the wording."],
      e: "Validity is supported when score patterns align with theory and relevant external evidence."
    },
    {
      k: "application", p: "14", o: "limits of standardization", practice: true,
      q: "All students receive identical toothbrushes, but the index actually measures gum color rather than plaque. What is the main problem?",
      a: "The procedure may be standardized and reliable, yet invalid for plaque.",
      d: ["The sample is automatically too large.", "The outcome becomes nominal.", "The study necessarily commits a Type I error."],
      e: "Consistency of administration cannot repair a mismatch between the measure and the intended construct."
    },
    {
      k: "application", p: "13-14", o: "measurement bias", practice: true,
      q: "An unblinded examiner consistently gives lower plaque scores to students known to be in the education group. Which property is most directly compromised?",
      a: "Validity of the plaque measurement and the study's internal conclusion",
      d: ["The existence of an absolute zero", "The sample size", "The PICO population"],
      e: "Systematic expectancy bias makes scores reflect group knowledge in addition to actual plaque."
    }
  ]);

  section(T.studyValidity, [
    {
      k: "theory", p: "13", o: "internal validity",
      q: "What does strong internal validity permit a researcher to argue?",
      a: "The outcome difference is attributable to the studied exposure rather than a plausible alternative explanation.",
      d: ["The finding must apply to every population.", "Every score is free of measurement error.", "The null hypothesis can never be true."],
      e: "Internal validity is the credibility of the causal or explanatory conclusion within the study."
    },
    {
      k: "theory", p: "13", o: "external validity",
      q: "What does external validity address?",
      a: "Whether findings are likely to hold across relevant people, settings, and conditions",
      d: ["Whether two raters agree", "Whether the arithmetic mean is correct", "Whether the null was rejected"],
      e: "External validity concerns the reach or generalizability of study findings."
    },
    {
      k: "theory", p: "13", o: "history threat",
      q: "A citywide oral-health campaign begins between a study's pretest and posttest. Which internal-validity threat is this?",
      a: "History",
      d: ["Maturation", "Selection", "Inter-rater reliability"],
      e: "History is an outside event occurring during the study that could explain the observed change."
    },
    {
      k: "theory", p: "13", o: "maturation threat",
      q: "Students naturally improve manual dexterity over a semester even without the intervention. This is:",
      a: "Maturation",
      d: ["History", "Instrumentation", "Type I error"],
      e: "Maturation includes natural development, fatigue, recovery, or other within-person change over time."
    },
    {
      k: "theory", p: "13", o: "attrition threat",
      q: "If students with the worst plaque scores disproportionately leave the comparison group, the study faces:",
      a: "Differential attrition",
      d: ["A percentile conversion error", "Improved external validity", "Inter-rater consistency"],
      e: "Unequal dropout changes group composition and can create a misleading treatment difference."
    },
    {
      k: "application", p: "14", o: "observer bias", practice: true,
      q: "The plaque examiners are trained but not blinded to educational group. What is the most serious validity concern?",
      a: "Knowledge of group assignment could bias outcome scoring.",
      d: ["The participants were measured during school hours.", "The sample includes exactly 128 students.", "A mouth mirror was used."],
      e: "Training can improve consistency, but lack of blinding permits expectancy or observer bias."
    },
    {
      k: "application", p: "14", o: "diffusion or contamination", practice: true,
      q: "Why might selecting only one educational condition within each school protect internal validity?",
      a: "It reduces treatment diffusion or contamination between students in different conditions.",
      d: ["It guarantees random sampling of all schools.", "It makes examiners blind.", "It increases the outcome's measurement scale."],
      e: "Students in one school can share intervention information; keeping one condition per school reduces that mixing."
    },
    {
      k: "application", p: "14", o: "cluster-selection trade-off", practice: true,
      q: "What new concern can arise when each entire school receives only one educational condition?",
      a: "Preexisting school differences may be confounded with the assigned condition.",
      d: ["The plaque outcome becomes qualitative.", "The study can no longer have a null hypothesis.", "Every student must receive a different toothbrush."],
      e: "Cluster-level assignment can reduce contamination but requires attention to baseline differences between schools."
    },
    {
      k: "application", p: "14", o: "instrumentation threat", practice: true,
      q: "One examiner uses a stricter plaque-scoring rule at posttest than at pretest. Which threat is most direct?",
      a: "Instrumentation",
      d: ["History", "Maturation", "External replication"],
      e: "A change in the measuring process can create apparent change in the outcome."
    },
    {
      k: "application", p: "13-14", o: "selection threat", practice: true,
      q: "The education group begins with much lower plaque than the comparison group because teachers chose the groups. What is the main threat?",
      a: "Selection bias",
      d: ["Testing effect", "A Type II error by definition", "Test-retest reliability"],
      e: "Baseline nonequivalence provides an alternative explanation for later group differences."
    },
    {
      k: "application", p: "13-14", o: "external-validity threat", practice: true,
      q: "A toothbrushing study enrolls students from one unusually well-resourced school. What conclusion is most threatened?",
      a: "Generalization to students in different schools or communities",
      d: ["The arithmetic accuracy of the sample mean", "Agreement between the two examiners", "Whether plaque was measured after brushing"],
      e: "A narrow or atypical setting limits external validity even if the within-study comparison is sound."
    },
    {
      k: "application", p: "13-14", o: "internal-external trade-off", practice: true,
      q: "A highly controlled clinic study produces clear causal evidence but uses conditions unlike routine practice. Which summary is best?",
      a: "Internal validity may be strong while external validity remains uncertain.",
      d: ["External validity guarantees internal validity.", "The study is invalid because control is always harmful.", "Reliability and generalizability are identical."],
      e: "Control can eliminate alternative explanations while reducing similarity to real-world settings."
    }
  ]);

  section(T.studyValidity, [
    {
      k: "theory", p: "13", o: "clinical use of validity threats",
      q: "Why is it useful for a health practitioner to classify a problem as a measurement, internal-validity, or external-validity threat?",
      a: "The category identifies what conclusion is weakened and what corrective action is most relevant.",
      d: ["Every category requires the same solution.", "Classification converts all outcomes to ratio data.", "Naming a threat removes it from the study."],
      e: "A measurement problem questions the score, an internal threat questions the within-study explanation, and an external threat questions generalization."
    }
  ]);

  // __SECTIONS__

  const counts = bank.reduce((acc, question) => {
    acc[question.kind] = (acc[question.kind] || 0) + 1;
    return acc;
  }, {});

  if (bank.some(question => question.options.length !== 4 || question.answer < 0)) {
    throw new Error("Invalid review question detected.");
  }

  window.STATS_QUESTIONS = bank;
  window.STATS_EXAM_CONFIG = {
    updatedReview: "September 21, 2026",
    sourcePages: 14,
    rebuiltFromScratch: true,
    durationMinutes: 80,
    fullExam: { total: 50, theory: 26, application: 16, calculation: 8 },
    practiceExam: { total: 40, theory: 18, application: 14, calculation: 8, durationMinutes: 60 },
    counts,
    formulas: [
      "Mean = sum of scores / n",
      "Range = maximum - minimum",
      "IQR = Q3 - Q1",
      "Outlier fences = Q1 - 1.5(IQR), Q3 + 1.5(IQR)",
      "z = (x - mean) / SD",
      "x = mean + z(SD)",
      "95% CI = sample mean +/- 1.96(SD / square root of n)",
      "Power = 1 - beta"
    ]
  };
})();
