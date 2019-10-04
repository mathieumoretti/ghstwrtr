const Sentence = function()
{
    const sentence = {
        content : "",
    }
    return sentence;
}

const SentenceDataModel = function()
{
    const id = 0;
    const sentence = Sentence();

    const sentenceDataModel =
    {
        id : id++,
        sentence : sentence,
    }
    return sentenceDataModel
}

module.exports = Sentence;
